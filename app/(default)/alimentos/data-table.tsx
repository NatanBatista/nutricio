"use client"

import AlterRow from "./alter-row"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import ExclusionButton from "./exclusion-button"
import React, { useEffect, useState } from "react"
import { Checkbox } from "@/components/ui/checkbox"
import PaginationGlobal from "@/components/pagination"
import { useSearchParams } from "next/navigation"
import { getAxiosClient } from "@/services/fetchClient/axiosClient"
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react"

import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import {
  Drawer,
  DrawerContent,
  DrawerTrigger
} from "@/components/ui/drawer";

import {
  Table,
  TableHeader, TableRow,
  TableHead, TableBody,
  TableCell
} from "@/components/ui/table";



export const columns: ColumnDef<Food>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },

  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Nome
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => <div className="capitalize">{row.getValue("name")}</div>,
  },
  {
    accessorKey: "Caloria",
    header: "Caloria",
    cell: ({ row }) => (
      <div className="capitalize">{row.original.nutricional_value.energy_kcal}</div>
    ),
  },
  {
    accessorKey: "Carboitrato",
    header: "Carboitrato",
    cell: ({ row }) => (
      <div className="capitalize">{row.original.nutricional_value.total_carbohydrate}</div>
    ),
  },
  {
    accessorKey: "Lipidios",
    header: "Lipidios",
    cell: ({ row }) => (
      <div className="capitalize">{row.original.nutricional_value.lipids}</div>
    ),
  },
  {
    accessorKey: "Proteina",
    header: "Proteina",
    cell: ({ row }) => (
      <div className="capitalize">{row.original.nutricional_value.protein}</div>
    ),
  },
  {
    accessorKey: "Ferro",
    header: "Ferro",
    cell: ({ row }) => (
      <div className="capitalize">{row.original.nutricional_value.iron}</div>
    ),
  },
  {
    accessorKey: "Fosforo",
    header: "Fosforo",
    cell: ({ row }) => (
      <div className="capitalize">{row.original.nutricional_value.phosphorus}</div>
    ),
  },
  {
    accessorKey: "Fibra",
    header: "Fibra",
    cell: ({ row }) => (
      <div className="capitalize">{row.original.nutricional_value.dietary_fiber}</div>
    ),
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      // const payment = row.original

      return (
        <Drawer key={row.id}>
          <DrawerTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DrawerTrigger>
          <DrawerContent>
            <AlterRow Food={row.original} />
          </DrawerContent>
        </Drawer>
      )
    },
  },
]

const DataTable = () => {
  const searchParams = useSearchParams();
  const axiosClient = getAxiosClient();

  const [response, setResponse] = useState<ResponseFood | null>(null);
  const pageFromQuery = searchParams.get('page') || '1';
  const [page, setPage] = useState<number>(parseInt(pageFromQuery));

  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})

  const table = useReactTable({
    data: response ? response.foods : [],
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  const selectedRowIds = Object.keys(rowSelection).map((rowId) => {
    const row = table.getRow(rowId);
    return row.original.id;
  });

  async function fetchData() {
    try {
      const res = await axiosClient.get(`/foods?page=${page}`);
      setResponse(res.data);
      console.log(res.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  useEffect(() => {
    fetchData();
  }, [page]);


  return (
    <>
      <div className="w-full">
        <div className="flex items-center justify-between py-4">
          <Input
            placeholder="Filtrar nomes..."
            value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("name")?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
          />

          <div>
            {selectedRowIds.length > 0 && (
              <>
                <ExclusionButton ids={selectedRowIds}></ExclusionButton>
              </>

            )}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="ml-auto">
                  Colunas <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {table
                  .getAllColumns()
                  .filter((column) => column.getCanHide())
                  .map((column) => {
                    return (
                      <DropdownMenuCheckboxItem
                        key={column.id}
                        className="capitalize"
                        checked={column.getIsVisible()}
                        onCheckedChange={(value) =>
                          column.toggleVisibility(!!value)
                        }
                      >
                        {column.id}
                      </DropdownMenuCheckboxItem>
                    )
                  })}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                      </TableHead>
                    )
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (

                  <TableRow
                  key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    Carregando...
                  </TableCell>
                </TableRow>

              )}
            </TableBody>
          </Table>
        </div>
        <div className="flex items-center justify-end space-x-2 py-4">
          <div className="flex-1 text-sm text-muted-foreground">
            {table.getFilteredSelectedRowModel().rows.length} de{" "}
            {table.getFilteredRowModel().rows.length} linhas(s) selecionadas.
          </div>
        </div>
      </div>

      <PaginationGlobal page={page} total_pages={response?.meta.total_pages ?? 1} setPage={setPage} />

    </>
  );
};

export default DataTable;
