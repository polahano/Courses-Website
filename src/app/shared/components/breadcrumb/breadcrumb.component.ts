
// breadcrumb.component.ts
import { Component, inject } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute, RouterLink } from '@angular/router';
import { filter, map } from 'rxjs/operators';

interface BreadcrumbItem {
  label: string;
  url: string;
  isLast: boolean;
}
@Component({
  selector: 'app-breadcrumb',
  imports: [RouterLink],
  templateUrl: './breadcrumb.component.html',
  styleUrl: './breadcrumb.component.scss'
})
export class BreadcrumbComponent {
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);

  breadcrumbs: BreadcrumbItem[] = [];

  ngOnInit(): void {
    const build = () => (this.breadcrumbs = this.buildBreadcrumbs(this.activatedRoute.root));
    this.router.events.pipe(filter(e => e instanceof NavigationEnd)).subscribe(build);
    build(); // initial
  }

  private buildBreadcrumbs(route: ActivatedRoute, url = '', crumbs: BreadcrumbItem[] = []): BreadcrumbItem[] {
    // Start with a fixed Home (change url if your home is different)
    if (crumbs.length === 0) {
      crumbs.push({ label: 'Home', url: '/home', isLast: false });
    }

    const child = route.children.find(c => c.outlet === 'primary');
    if (!child) {
      if (crumbs.length) crumbs[crumbs.length - 1].isLast = true;
      return crumbs;
    }

    // Append this level’s path
    const segs = child.snapshot.url.map(s => s.path).filter(Boolean);
    if (segs.length) url += '/' + segs.join('/');

    // Choose a label:
    // 1) static from route data
    let label: string | undefined = child.snapshot.data?.['breadcrumb'];

    // 2) if the route has a param (e.g., :name), use its value
    if (!label) {
      const configPath = child.routeConfig?.path ?? '';
      const match = configPath.match(/:(\w+)/); // first param key
      const key = match?.[1];
      const val = key ? child.snapshot.paramMap.get(key) : null;
      if (val) label = this.formatLabel(val);
    }

    // 3) fallback to last URL segment
    if (!label) {
      const lastSeg = segs[segs.length - 1];
      if (lastSeg) label = this.formatLabel(lastSeg);
    }

    // Push if we resolved a label and it’s not a duplicate of the last
    if (label) {
      const last = crumbs[crumbs.length - 1];
      if (!last || last.label !== label) {
        crumbs.push({ label, url: url || '/', isLast: false });
      }
    }

    // Recurse down the active branch
    return this.buildBreadcrumbs(child, url, crumbs);
  }

  private formatLabel(s: string): string {
    return decodeURIComponent(s)
      .replace(/[-_]/g, ' ')
      .replace(/\b\w/g, c => c.toUpperCase());
  }
}
