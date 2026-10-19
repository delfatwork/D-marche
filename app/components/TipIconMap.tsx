import type { ComponentType } from "react";
import {
  BellIcon,
  BreathIcon,
  CalendarIcon,
  CheckIcon,
  DcCardIcon,
  FootprintIcon,
  HeartIcon,
  RouteIcon,
  ShoeIcon,
  SparkleIcon,
  SunIcon,
  TargetIcon,
  UsersIcon,
} from "@/app/components/icons";
import type { TipIcon } from "@/app/lib/parcourir-data";

export const TIP_ICONS: Record<TipIcon, ComponentType<{ className?: string }>> = {
  shoe: ShoeIcon,
  heart: HeartIcon,
  footprint: FootprintIcon,
  sun: SunIcon,
  breath: BreathIcon,
  target: TargetIcon,
  calendar: CalendarIcon,
  route: RouteIcon,
  users: UsersIcon,
  bell: BellIcon,
  card: DcCardIcon,
  sparkle: SparkleIcon,
  check: CheckIcon,
};
