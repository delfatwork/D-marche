import {
  ArrowRight,
  ArrowsClockwise,
  Bell,
  Bluetooth,
  Calendar,
  Cards,
  Chair,
  Compass,
  Drop,
  Flag,
  Footprints,
  Funnel,
  Gauge,
  Gear,
  Heart,
  House,
  MagnifyingGlass,
  MapPin,
  Path,
  PersonSimpleWalk,
  Phone,
  Plus,
  Printer,
  Ruler,
  Sneaker,
  Sparkle,
  Sun,
  Target,
  Trophy,
  User,
  Users,
  CaretLeft,
  Wind,
} from "@phosphor-icons/react/ssr";

export function BackIcon() {
  return <CaretLeft weight="fill" aria-hidden="true" focusable="false" />;
}

export function CheckIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={32} height={32} fill="currentColor" viewBox="0 0 256 256" aria-hidden="true" focusable="false">
      <path d="M229.66,77.66l-128,128a8,8,0,0,1-11.32,0l-56-56a8,8,0,0,1,11.32-11.32L96,188.69,218.34,66.34a8,8,0,0,1,11.32,11.32Z" />
    </svg>
  );
}

export function BluetoothIcon() {
  return <Bluetooth className="btn-ico" weight="fill" aria-hidden="true" focusable="false" />;
}

export function TargetIcon({ className }: { className?: string }) {
  return <Target className={className} weight="fill" aria-hidden="true" focusable="false" />;
}

export function TimerIcon({ className }: { className?: string }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width={32} height={32} fill="currentColor" viewBox="0 0 256 256" aria-hidden="true" focusable="false">
      <path d="M175.3,63.53l-6.24-34.38A16,16,0,0,0,153.32,16H102.68A16,16,0,0,0,86.94,29.15L80.7,63.53a79.9,79.9,0,0,0,0,128.94l6.24,34.38A16,16,0,0,0,102.68,240h50.64a16,16,0,0,0,15.74-13.15l6.24-34.38a79.9,79.9,0,0,0,0-128.94ZM102.68,32h50.64l3.91,21.55a79.75,79.75,0,0,0-58.46,0Zm50.64,192H102.68l-3.91-21.55a79.75,79.75,0,0,0,58.46,0ZM168,136H128a8,8,0,0,1-8-8V88a8,8,0,0,1,16,0v32h32a8,8,0,0,1,0,16Z" />
    </svg>
  );
}

export function RouteIcon({ className }: { className?: string }) {
  return <Path className={className} weight="fill" aria-hidden="true" focusable="false" />;
}

export function StepsIcon({ className }: { className?: string }) {
  return <Footprints className={className} weight="fill" aria-hidden="true" focusable="false" />;
}

export function SettingsIcon() {
  return <Gear weight="fill" aria-hidden="true" focusable="false" />;
}

export function PedometerIcon() {
  return <Gauge weight="fill" aria-hidden="true" focusable="false" />;
}

export function FootprintIcon({ className }: { className?: string }) {
  return <Footprints className={className} weight="fill" aria-hidden="true" focusable="false" />;
}

export function CalendarIcon() {
  return <Calendar weight="fill" aria-hidden="true" focusable="false" />;
}

export function SunIcon() {
  return <Sun weight="fill" aria-hidden="true" focusable="false" />;
}

export function TrophyIcon() {
  return <Trophy weight="fill" aria-hidden="true" focusable="false" />;
}

export function SparkleIcon() {
  return <Sparkle weight="fill" aria-hidden="true" focusable="false" />;
}

export function SearchIcon() {
  return <MagnifyingGlass weight="regular" aria-hidden="true" focusable="false" />;
}

export function FilterIcon() {
  return <Funnel weight="regular" aria-hidden="true" focusable="false" />;
}

export function PinIcon() {
  return <MapPin weight="fill" aria-hidden="true" focusable="false" />;
}

export function UsersIcon() {
  return <Users weight="fill" aria-hidden="true" focusable="false" />;
}

export function DistanceIcon() {
  return <Ruler weight="fill" aria-hidden="true" focusable="false" />;
}

export function PrintIcon() {
  return <Printer weight="fill" aria-hidden="true" focusable="false" />;
}

export function ShoeIcon() {
  return <Sneaker weight="fill" aria-hidden="true" focusable="false" />;
}

export function DropIcon() {
  return <Drop weight="fill" aria-hidden="true" focusable="false" />;
}

export function BenchIcon() {
  return <Chair weight="fill" aria-hidden="true" focusable="false" />;
}

export function PhoneIcon() {
  return <Phone weight="fill" aria-hidden="true" focusable="false" />;
}

export function FlagIcon() {
  return <Flag weight="fill" aria-hidden="true" focusable="false" />;
}

export function CrossingIcon() {
  return <PersonSimpleWalk weight="fill" aria-hidden="true" focusable="false" />;
}

export function UserIcon() {
  return <User weight="fill" aria-hidden="true" focusable="false" />;
}

export function HeartIcon() {
  return <Heart weight="fill" aria-hidden="true" focusable="false" />;
}

export function BreathIcon() {
  return <Wind weight="fill" aria-hidden="true" focusable="false" />;
}

export function BellIcon() {
  return <Bell weight="fill" aria-hidden="true" focusable="false" />;
}

export function DcCardIcon({ className }: { className?: string }) {
  return <Cards className={className} weight="fill" aria-hidden="true" focusable="false" />;
}

export function PlusIcon() {
  return <Plus weight="fill" aria-hidden="true" focusable="false" />;
}

export function ArrowRightIcon() {
  return <ArrowRight weight="fill" aria-hidden="true" focusable="false" />;
}

export function HomeIcon() {
  return <House weight="fill" aria-hidden="true" focusable="false" />;
}

export function CompassIcon() {
  return <Compass weight="fill" aria-hidden="true" focusable="false" />;
}

export function SyncIcon() {
  return <ArrowsClockwise className="sync-ico" weight="fill" aria-hidden="true" focusable="false" />;
}

export function Logo({ className }: { className?: string }) {
  return (
    <svg className={`logo${className ? ` ${className}` : ""}`} viewBox="0 0 96 96" aria-hidden="true" focusable="false">
      <rect className="l-bg" width={96} height={96} rx={28} />
      <ellipse className="l-a" cx={36} cy={40} rx={8} ry={13} transform="rotate(-12 36 40)" />
      <ellipse className="l-b" cx={60} cy={58} rx={8} ry={13} transform="rotate(-12 60 58)" />
    </svg>
  );
}
