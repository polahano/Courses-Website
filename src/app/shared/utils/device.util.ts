export function isMobileDevice(): boolean {
    if (typeof window === 'undefined' || typeof navigator === 'undefined') {
        return false; // in case of SSR (Angular Universal, Next.js, etc.)
    }

    // Check User Agent for mobile devices
    const ua = navigator.userAgent || navigator.vendor || (window as any).opera;

    if (/android/i.test(ua)) return true;
    if (/iPhone|iPad|iPod/i.test(ua)) return true;

    // Fallback: check screen width (you can adjust breakpoint)
    return window.innerWidth <= 768;
}