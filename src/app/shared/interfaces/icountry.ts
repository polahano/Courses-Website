export interface ICountry {
    id: number
    name: string
    iso3: string
    numeric_code: string
    iso2: string
    phonecode: string
    capital: string
    currency: string
    currency_name: string
    currency_symbol: string
    tld: string
    native?: string
    region: string
    region_id?: number
    subregion: string
    subregion_id?: number
    nationality: string
    timezones: string
    translations: string
    latitude: string
    longitude: string
    emoji: string
    emojiU: string
    created_at: string
    updated_at: string
    flag: number
    wikiDataId?: string
}

export interface IState {
    id: number
    name: string
    country_id: number
    country_code: string
    fips_code: string
    iso2: string
    type: any
    latitude: string
    longitude: string
    created_at: string
    updated_at: string
    flag: number
    wikiDataId: string
}
