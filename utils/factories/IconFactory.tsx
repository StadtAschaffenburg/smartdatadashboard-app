import { IconStyle } from '@/utils/variants/IconVariants'
import { TileVariantTypes } from '@/utils/variants/TileVariants'
import { cx } from 'class-variance-authority'
import Placeholder from '@/components/Icons/Placeholder'
import { ForwardRefExoticComponent, RefAttributes, SVGProps } from 'react'

// import all icons
import * as EcologyIcons from '@/components/Icons/Ecology'
import * as SocialIcons from '@/components/Icons/Social'
import * as EconomyIcons from '@/components/Icons/Economy'
import * as MiscIcons from '@/components/Icons/Misc'

import {
  ArrowLongLeftIcon as ArrowLeft,
  ArrowLongRightIcon as ArrowRight,
} from '@heroicons/react/24/outline'

interface IconFactoryProps {
  type: string | null | undefined
  className?: string
  variant?: TileVariantTypes
}

type IconComponent =
  | React.FC<{ className: string }>
  | ForwardRefExoticComponent<
      Omit<SVGProps<SVGSVGElement>, 'ref'> & {
        title?: string
        titleId?: string
      } & RefAttributes<SVGSVGElement>
    >

const iconMap: Record<string, IconComponent> = {
  // Ecology
  pv: EcologyIcons.IconPv,
  lanterns: EcologyIcons.IconLanterns,
  water: EcologyIcons.IconWater,
  recycling: EcologyIcons.IconRecycling,
  biomass: EcologyIcons.IconBiomass,
  nutzfahrzeug_abgas: EcologyIcons.IconStadtwerkeAbgas,
  nutzfahrzeug_elektro: EcologyIcons.IconStadtwerkeElektro,
  bus_abgas: EcologyIcons.IconBusAbgas,
  bus_elektro: EcologyIcons.IconBusElektro,
  school: EcologyIcons.IconBuildingSchule,
  library: EcologyIcons.IconBuildingBibliothek,
  arena: EcologyIcons.IconBuildingArena,
  line_mh_arena: EcologyIcons.StadionAb260203Fin,
  townhall: EcologyIcons.IconBuildingRathaus,
  car: EcologyIcons.IconCar,
  weatherstation: EcologyIcons.IconWeatherstation,
  earth_heart: EcologyIcons.IconEarthHeart,
  auto: EcologyIcons.Auto217403851918,
  co2_emissionen_ab: EcologyIcons.Co2EmissionenAb219420003339,
  co2_emissionen_stadtbau: EcologyIcons.Co2EmissionenStadtbau219420003319,
  e_laden: EcologyIcons.ELaden224525512903,
  fliesswasserqualitaet: EcologyIcons.Fliesswasserqualitaet247035903352,
  freie_flaeche_inanspruchnahme:
    EcologyIcons.FreieFlaecheInanspruchannahmee253727075357,
  freie_flaeche_neuinanspruchnahme:
    EcologyIcons.FreieFlaecheNeuinanspruchnahme221982627132,
  freie_flaeche_nicht_ueberbaut:
    EcologyIcons.FreieFlaecheNichtUeberbaut253727075315,
  freie_flaeche_siedlung_verkehr_1:
    EcologyIcons.FreieFlaecheSiedlungVerkehr221982627147,
  freie_flaeche_siedlung_verkehr_2:
    EcologyIcons.FreieFlaecheSiedlungVerkehr221982627149,
  freie_flaechen_bauluecken: EcologyIcons.FreieFlaechenBauluecken221982627171,
  freie_flaechen_flaechennutzungsintensitaet:
    EcologyIcons.FreieFlaechenFlaechennutzungsintensitaet221982627117,
  laternen: EcologyIcons.Laternen219420003357,
  muell_abfallmenge: EcologyIcons.MuellAbfallmenge242271743718,
  muell_gelbe_tonne: EcologyIcons.MuellGelbeTonne219420003345,
  muell_hausmuell: EcologyIcons.MuelllHausmuell242271743704,
  pv_anlagen_privat: EcologyIcons.PvAnlagenPrivat253727075343,
  pv_anlagen_staedtisch: EcologyIcons.PvAnlagenStädtisch219420003344,
  passanten: EcologyIcons.Passanten247035903376,
  radelnde: EcologyIcons.Radelnde221139573108,
  staedt_energieerzeugung: EcologyIcons.StaedtEnergieerzeugung219420003325,
  staedt_energieverbrauch_ab: EcologyIcons.StaedtEnergieverbrauchAb238456407511,
  staedt_energieverbrauch_energiematrix:
    EcologyIcons.StaedtEnergieverbrauchEnergiematrix219420003308,
  staedt_energieverbrauch_regenerativ:
    EcologyIcons.StaedtEnergieverbrauchRegenerativ253727075351,
  verunglueckte_verkehr: EcologyIcons.VerunglückteVerkehr235194006749,
  wasserverbrauch_abwasserbehandlung:
    EcologyIcons.WasserverbrauchAbwasserbehandlung242271743731,
  wasserverbrauch_trinkwasserverbrauch:
    EcologyIcons.WasserverbrauchTrinkwasserverbrauch238456407523,
  wasserverbrauch_trinkwasserverbrauch_jahr:
    EcologyIcons.WasserverbrauchTrinkwasserverbrauchJahr219420003312,
  wasserverbrauch_zisterne: EcologyIcons.WasserverbrauchZisterne253727075314,
  gruene_stadt: EcologyIcons.GrueneStadt247035903331,
  gruene_stadt_artenvielfalt: EcologyIcons.GrueneStadtArtenvielfalt247035903359,
  gruene_stadt_landschaftsqualitaet:
    EcologyIcons.GrueneStadtLandschaftsqualitaet247035903304,
  gruene_stadt_oekologisch: EcologyIcons.GrueneStadtOekologisch253727075338,
  gruene_stadt_versiegelte_flaeche:
    EcologyIcons.GrueneStadtVersiegelteFlaeche253727075341,
  gruene_stadt_versiegelte_flaechen_grundstuecke:
    EcologyIcons.GrueneStadtVersiegelteFlaechenGrundstuecke2219826271111,
  staetische_stromerzeugung_industrie:
    EcologyIcons.StaedtStromerzeugungIndustrie2174038519139,
  staetische_stromerzeugung_fossil:
    EcologyIcons.StaedtStromerzeugungFossil2174038519118,
  staetische_stromerzeugung_regenerativ:
    EcologyIcons.StaedtStromerzeugungRegenerativ219420003325,
  // Economy
  hotel: EconomyIcons.IconHotel,
  service_analog: EconomyIcons.IconServiceA,
  service_digital: EconomyIcons.IconServiceD,
  hand_profit: EconomyIcons.IconHandProfit,
  business_people: EconomyIcons.IconBusinessPeople,
  business_check: EconomyIcons.IconBusinessCheck,
  business_target: EconomyIcons.IconBusinessTarget,
  money_safe: EconomyIcons.IconMoneySafe,
  house_value: EconomyIcons.IconHouseValue,
  stock_coin: EconomyIcons.IconStockCoin,
  stock_market: EconomyIcons.IconStockMarket,
  money_bag: EconomyIcons.IconMoneyBag,
  job_search: EconomyIcons.IconJobSearch,
  piggy_bank: EconomyIcons.IconPiggyBank,
  money_increase: EconomyIcons.IconMoneyIncrease,
  wallet: EconomyIcons.IconWallet,
  plot: EconomyIcons.IconPlot,
  money_keys: EconomyIcons.IconMoneyKeys,
  housing_prices: EconomyIcons.IconHousingPrices,
  pedestal: EconomyIcons.IconPedestal,
  person_spreadsheet: EconomyIcons.IconPersonSpreadsheet,
  promotion: EconomyIcons.IconPromotion,
  cv: EconomyIcons.IconCV,
  arbeitslosenquote: EconomyIcons.Arbeitslosenquote227212823154,
  bip: EconomyIcons.Bip214701252343,
  beschaeftigung_hochqualifiziert:
    EconomyIcons.BeschäfigungHochqualifizier214701252305,
  beschaeftigung_ab: EconomyIcons.BeschäftigungAb220415042511,
  beschaeftigung_alt: EconomyIcons.BeschäftigungAlt220415042539,
  beschaeftigung_jung: EconomyIcons.BeschäftigungJung220415042541,
  existenzgruendung: EconomyIcons.Existenzgründung216135437144,
  hoteluebernachtungen: EconomyIcons.Hotelübernachtungen217403851907,
  kommunaler_haushalt: EconomyIcons.KommunalerHaushalt214701252372,
  kommunaler_haushalt_steuereinnahmen:
    EconomyIcons.KommunalerHaushaltSteuereinnahmen214701252341,
  kommunaler_haushalt_zufuehrungsberatung:
    EconomyIcons.KommunalerHaushaltZuführungsberatung214701252356,
  kommunaler_haushalt_verschuldung:
    EconomyIcons.KommunalterHaushaltVerschuldung221982627157,
  lehrstellen: EconomyIcons.Lehrstellen216135437166,
  online_dienste: EconomyIcons.OnlineDienste227212823116,
  schulabschluss_abbruch: EconomyIcons.SchulabschlussAbbruch2161354371142,
  schulabschluss_erfolg: EconomyIcons.SchulabschlussErfolg216135437114,
  // Social
  people: SocialIcons.IconPeople,
  births: SocialIcons.IconBirth,
  deaths: SocialIcons.IconDeath,
  hospital: SocialIcons.IconHospital,
  hospital_bed: SocialIcons.IconHospitalBed,
  court: SocialIcons.IconCourt,
  indoor_pool: SocialIcons.IconIndoorPool,
  ice_skating: SocialIcons.IconIceSkating,
  adult_learning: SocialIcons.IconAdultLearning,
  world_couple: SocialIcons.IconWorldCouple,
  group: SocialIcons.IconGroup,
  world_population: SocialIcons.IconWorldPopulation,
  umbrella: SocialIcons.IconUmbrella,
  caring: SocialIcons.IconCaring,
  conversation: SocialIcons.IconConversation,
  walker: SocialIcons.IconWalker,
  social_mobility: SocialIcons.IconSocialMobility,
  handcuffs: SocialIcons.IconHandcuffs,
  police_hat: SocialIcons.IconPoliceHat,
  arbeitslosigkeit: SocialIcons.Arbeitslosigkeit216135437103,
  arbeitslosigkeit_langzeitquote:
    SocialIcons.ArbeitslosigkeitLangzeitquote216135437157,
  bevoelkerungsentwicklung_wanderung:
    SocialIcons.BevölkerungsentwicklungWanderung216135437175,
  eine_welt_arbeit_begegnungen:
    SocialIcons.EineWeltArbeitBegegnungen220415042520,
  eine_welt_arbeit_engagement_initiative:
    SocialIcons.EineWeltArbeitEngagementInitiative227212822533,
  eine_welt_arbeit_entwicklungszusammenarbeit:
    SocialIcons.EineWeltArbeitEntwicklungszusammenarbeit220415042519,
  eine_welt_arbeit_globaler_sueden:
    SocialIcons.EineWeltArbeitGlobalerSüden220415042504,
  erwachsenenbildung: SocialIcons.Erwachsenenbildung220415042536,
  fairer_kaffee_1: SocialIcons.FairerKaffee2290204317154,
  fairer_kaffee_2: SocialIcons.FairerKaffee2290204317198,
  fehlernaehrung: SocialIcons.Fehlernährung2290204317252,
  freie_flaeche_naherholungsflaeche:
    SocialIcons.FreieFlächeNaherholungsfläche247035903365,
  freizeitwelt_eissporthalle:
    SocialIcons.FreizeitweltEissporthalle2174038519294,
  freizeitwelt_freibad: SocialIcons.FreizeitweltFreibad242150048938,
  freizeitwelt_hallenbad: SocialIcons.FreizeitweltHallenbad242150048942,
  freizeitwelt_sauna: SocialIcons.FreizeitweltSauna242150048916,
  gaeste_stadt_gaestepaesse: SocialIcons.GästeStadtGästepässe216135437136,
  geburten_todesfaelle_1: SocialIcons.GeburtenTodesfälle247035903338,
  geburten_todesfaelle_2: SocialIcons.GeburtenTodesfälle247035964507,
  gleichberechtigung_beschaeftigungsquote:
    SocialIcons.GleichberechtigungBeschäftigungsquote216135437138,
  gleichberechtigung_verdienstabstand:
    SocialIcons.GleichberechtigungVerdienstabstand227212823129,
  grenzenlos: SocialIcons.Grenzenlos229020431772,
  integration_beschaeftigung: SocialIcons.IntegrationBeschäftigung220415042505,
  integration_bildungsabschluesse:
    SocialIcons.IntegrationBildungsabschlüsse220415042563,
  integration_einbuergerung: SocialIcons.IntegrationEinbürgerung220415042539,
  integration_schulabbrecherquote:
    SocialIcons.IntegrationSchulabbrecherquote216135437101,
  kita_interaktiv: SocialIcons.KiTaInteraktiv2174038519268,
  kinderbetreuung_krippe: SocialIcons.KinderbetreuungKrippe220415042533,
  krankenhaeuser: SocialIcons.Krankenhäuser247035964574,
  kriminalitaet_dichte: SocialIcons.KriminalitätDichte247035964555,
  kriminalitaet_straftaten: SocialIcons.KriminalitätStraftaten247035964509,
  kultureinrichtungen_museen: SocialIcons.KultureinrichtungenMuseen221982627188,
  kultureinrichtungen_stadthalle:
    SocialIcons.KultureinrichtungenStadthalle221982627138,
  oepnv_haltestellen: SocialIcons.ÖpnvHaltestellen2174038519161,
  schattenreich: SocialIcons.Schattenreich247035903314,
  sozialleistungen_alter_grundsicherung:
    SocialIcons.SozialleistungenAlterGrundsicherung235198422951,
  sozialleistungen_aufstocker:
    SocialIcons.SozialleistungenAufstocker227212823144,
  sozialleistungen_buergergeld:
    SocialIcons.SozialleistungenBürgergeld227212823151,
  sozialleistungen_jugendarmut:
    SocialIcons.SozialleistungenJugendarmut220415042522,
  sozialleistungen_kinderarmut:
    SocialIcons.SozialleistungenKinderarmut227212823120,
  sozialleistungen_wohngeld: SocialIcons.SozialleistungenWohngeld227212823102,
  trinkwasserbrunnen: SocialIcons.Trinkwasserbrunnen235194006719,
  wohnraum_einheiten_stadtbau:
    SocialIcons.WohnraumEinheitenStadtbau2219826271102,
  wohnraum_mietpreise_stadtbau:
    SocialIcons.WohnraumMietpreiseStadtbau221982627194,
  wohnraum_mietpreise_stadtgebiet:
    SocialIcons.WohnraumMietpreiseStadtgebiet221982627118,
  wohnraum_neubau: SocialIcons.WohnraumNeubau221982627126,
  wohnraum_wohnflaeche: SocialIcons.WohnraumWohnfläche2219826271105,
  wohnungsbau: SocialIcons.Wohnungsbau2219826271103,
  interkultureller_austausch_besucher:
    SocialIcons.InterkulturellerAustauschBesucher220955118107,
  interkultureller_austausch_sprachvermittler:
    SocialIcons.InterkulturellerAustauschSprachvermittler220415042561,
  interkultureller_austausch_veranstaltungen:
    SocialIcons.InterkulturellerAustauschVeranstaltungen220415042550,
  gleichberechtigung_stadtrat:
    SocialIcons.GleichberechtigungStadtrat216135437170,
  kinderbetreuung_kiga: SocialIcons.KinderbetreuungKiGa220415042515,
  kinderbetreuung_personal: SocialIcons.KinderbetreuungPersonal220415042578,
  pflege_heimplaetze: SocialIcons.PflegeHeimplätze2174038519245,
  pflege_pflegedienst: SocialIcons.PflegePflegedienst220955118102,
  pflege_pflegeheim: SocialIcons.PflegePflegeheim220955118117,
  fairtrade_einkauf: SocialIcons.FairtradeEinkauf2174038519142Fair,
  fairtrade_gastro: SocialIcons.FairtradeGastro229020431709,
  fairtrade_schulen: SocialIcons.FairtradeSchulen2174038519151,
  geburten_todesfaelle_flatline:
    SocialIcons.GeburtenTodesfaelle247035964507Flatline,
  gleichberechtigung_fuehrung:
    SocialIcons.GleichberechtigungFuehrung247035964544,
  sterblichkeit_frauen: SocialIcons.SterblichkeitFrauen,
  sterblichkeit_maenner: SocialIcons.SterblichkeitMaenner,
  schulverpflegung: SocialIcons.Schulverpflegung2290204317193,

  // Misc
  stadt_ab: MiscIcons.StadtAbMap,
  pool: MiscIcons.IconPool,
  sauna: MiscIcons.IconSauna,
  examination: MiscIcons.IconExamination,
  shielded: MiscIcons.IconShielded,
  badge: MiscIcons.IconBadge,
  hangar: MiscIcons.IconHangar,
  museum: MiscIcons.IconMuseum,
  location: MiscIcons.IconLocation,
  rocket: MiscIcons.IconRocket,
  person_time: MiscIcons.IconPersonTime,
  person_development: MiscIcons.IconPersonDevelopment,
  townhall_ab: MiscIcons.IconTownhallAb,
  person_barchart: MiscIcons.IconPersonBarchart,
  person_wallchart: MiscIcons.IconPersonWallchart,
  people_shield: MiscIcons.IconPeopleShield,
  people_speaking: MiscIcons.IconPeopleSpeaking,
  people_waving: MiscIcons.IconPeopleWaving,
  shade: MiscIcons.IconShade,
  arrow_right: ArrowRight,
  arrow_left: ArrowLeft,
  placeholder: Placeholder,
} as const

/**
 * The IconFactory is a helper function to create Icons dynamically.
 *
 * @param param IconFactoryProps
 * @returns Icon
 */
export default function IconFactory({
  className = '',
  variant = 'primary',
  type,
}: IconFactoryProps) {
  if (!type || !iconMap[type]) {
    console.warn(`Unknown icon type: ${type}`)
    return <></>
  }

  const Icon = iconMap[type]
  return <Icon className={cx(IconStyle({ variant }), className)} />
}
