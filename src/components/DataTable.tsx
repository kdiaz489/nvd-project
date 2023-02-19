import { useState } from "react";
import { useRouter } from "next/router";
import { Table, Thead, Tbody, Tr, Th, Td, chakra } from "@chakra-ui/react";
import {
  useReactTable,
  flexRender,
  getCoreRowModel,
  SortingState,
  getSortedRowModel,
} from "@tanstack/react-table";
import { FiArrowDown, FiArrowUp } from "react-icons/fi";
import { DataTableProps } from "@/types";

export function DataTable({ data, columns }: DataTableProps<any>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const router = useRouter();
  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
    },
  });

  return (
    <Table
      border="1px"
      borderColor="#fafafa"
      bgColor="white"
      borderRadius="md"
      mt={2}
    >
      <Thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <Tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => {
              // see https://tanstack.com/table/v8/docs/api/core/column-def#meta to type this correctly
              const meta: any = header.column.columnDef.meta;
              return (
                <Th
                  key={header.id}
                  onClick={header.column.getToggleSortingHandler()}
                  isNumeric={meta?.isNumeric}
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}

                  <chakra.span pl="4">
                    {header.column.getIsSorted() ? (
                      header.column.getIsSorted() === "desc" ? (
                        <FiArrowDown aria-label="sorted descending" />
                      ) : (
                        <FiArrowUp aria-label="sorted ascending" />
                      )
                    ) : null}
                  </chakra.span>
                </Th>
              );
            })}
          </Tr>
        ))}
      </Thead>
      <Tbody>
        {table.getRowModel().rows.map((row) => (
          <Tr
            key={row.id}
            onClick={() => router.push(`/cve/${row.original.id}`)}
            _hover={{ bgColor: "#fafafa", cursor: "pointer" }}
          >
            {row.getVisibleCells().map((cell) => {
              // see https://tanstack.com/table/v8/docs/api/core/column-def#meta to type this correctly
              const meta: any = cell.column.columnDef.meta;
              return (
                <Td key={cell.id} isNumeric={meta?.isNumeric}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </Td>
              );
            })}
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
}
