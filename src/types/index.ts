import { BoxProps, FlexProps } from "@chakra-ui/react";
import { ColumnDef } from "@tanstack/react-table";
import { IconType } from "react-icons";

export interface NvdData {
  format: string;
  resultsPerPage: number;
  startIndex: number;
  timestamp: string;
  totalResults: number;
  version: string;
  vulnerabilities: any[];
}

export interface LinkItemProps {
  name: string;
  icon: IconType;
  link: string;
}

export interface SidebarProps extends BoxProps {
  onClose: () => void;
}

export interface NavItemProps extends FlexProps {
  icon: IconType;
  children: any;
  link: string;
}

export interface MobileProps extends FlexProps {
  onOpen: () => void;
}

export type DataTableProps<Data extends object> = {
  data: Data[];
  columns: ColumnDef<Data, any>[];
};
