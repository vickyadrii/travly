import * as React from "react"

import { cn } from "@/lib/utils"

interface TableEmptyProps {
  colSpan?: number;
  message?: string;
}

function TableEmpty({ 
  colSpan = 6, 
  message = "Tidak ada data yang tersedai" 
}: TableEmptyProps) {
  return (
    <tr>
      <td 
        colSpan={colSpan} 
        className="text-center text-gray-600 p-4 bg-gray-50 font-medium"
      >
        {message}
      </td>
    </tr>
  )
}

function Table({ 
  className, 
  children, 
  ...props 
}: React.ComponentProps<"table"> & { 
  children: React.ReactNode 
}) {
  return (
    <div
      data-slot="table-container"
      className="relative w-full overflow-x-auto"
    >
      <table
        data-slot="table"
        className={cn("w-full caption-bottom text-sm", className)}
        {...props}
      >
        {children}
      </table>
    </div>
  )
}

function TableHeader({ className, ...props }: React.ComponentProps<"thead">) {
  return (
    <thead
      data-slot="table-header"
      className={cn("[&_tr]:border-b bg-sky-600", className)}
      {...props}
    />
  )
}

function TableBody({ 
  className, 
  children, 
  isEmpty, 
  emptyMessage,
  colSpan,
  ...props 
}: React.ComponentProps<"tbody"> & { 
  isEmpty?: boolean, 
  emptyMessage?: string,
  colSpan?: number
}) {
  return (
    <tbody
      data-slot="table-body"
      className={cn("[&_tr:last-child]:border-0", className)}
      {...props}
    >
      {isEmpty ? (
        <TableEmpty 
          message={emptyMessage} 
          colSpan={colSpan} 
        />
      ) : (
        children
      )}
    </tbody>
  )
}

function TableFooter({ className, ...props }: React.ComponentProps<"tfoot">) {
  return (
    <tfoot
      data-slot="table-footer"
      className={cn(
        "bg-muted/50 border-t font-medium [&>tr]:last:border-b-0",
        className
      )}
      {...props}
    />
  )
}

function TableRow({ className, ...props }: React.ComponentProps<"tr">) {
  return (
    <tr
      data-slot="table-row"
      className={cn(
        "data-[state=selected]:bg-muted border border-gray-200/80 transition-colors even:bg-gray-50",
        className
      )}
      {...props}
    />
  )
}

function TableHead({ className, ...props }: React.ComponentProps<"th">) {
  return (
    <th
      data-slot="table-head"
      className={cn(
        "text-white h-14 px-4 text-left align-middle font-bold whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
        className
      )}
      {...props}
    />
  )
}

function TableCell({ className, ...props }: React.ComponentProps<"td">) {
  return (
    <td
      data-slot="table-cell"
      className={cn(
        "p-3 align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
        className
      )}
      {...props}
    />
  )
}

function TableCaption({
  className,
  ...props
}: React.ComponentProps<"caption">) {
  return (
    <caption
      data-slot="table-caption"
      className={cn("text-muted-foreground mt-4 text-sm", className)}
      {...props}
    />
  )
}

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
  TableEmpty
}
