import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";

type MpsItem = {
  productName: string;
  workOrderId: string;
  quantity: number;
  dueDate: string;
  status: string;
};

const getStatusVariant = (status: string) => {
  switch (status) {
    case "Completed":
      return "success";
    case "In Progress":
      return "warning";
    case "Planned":
      return "secondary";
    default:
      return "secondary";
  }
};

const MasterProductionSchedule: React.FC = () => {
  const [data, setData] = useState<MpsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

useEffect(() => {
  const base = (import.meta.env.VITE_API_URL as string) ?? "http://localhost:5000";
  fetch(`${base}/api/mps`)
    .then((r) => r.json())
    .then((d) => {
      setData(d);
      setLoading(false);
    })
    .catch((err) => {
      console.error("Failed to fetch MPS data:", err);
      setLoading(false);
    });
}, []);


  const totalPages = Math.max(1, Math.ceil(data.length / pageSize));
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = Math.min(data.length, startIndex + pageSize);
  const pageData = data.slice(startIndex, endIndex);

  const goToPage = (p: number) => {
    if (p < 1) p = 1;
    if (p > totalPages) p = totalPages;
    setCurrentPage(p);
  };

  return (
    <div>
      <Card className="shadow-medium">
        <CardHeader>
          <CardTitle>Master Production Schedule (MPS)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4 flex justify-between items-center">
            <div className="text-sm text-muted-foreground">
              Plan and manage production schedules and work orders
            </div>
            <Button>
              <Plus className="w-4 h-4 mr-2" /> Add New Schedule
            </Button>
          </div>

          <div className="overflow-auto rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product Name</TableHead>
                  <TableHead>Work Order ID</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Due Date</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={5}>Loading...</TableCell>
                  </TableRow>
                ) : pageData.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5}>No records</TableCell>
                  </TableRow>
                ) : (
                  pageData.map((item, idx) => (
                    <TableRow key={idx}>
                      <TableCell>{item.productName}</TableCell>
                      <TableCell>{item.workOrderId}</TableCell>
                      <TableCell>{item.quantity}</TableCell>
                      <TableCell>{item.dueDate}</TableCell>
                      <TableCell>
                        <Badge variant={getStatusVariant(item.status) as any}>
                          {item.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>

          <div className="flex items-center justify-between mt-6">
            <div className="text-sm text-muted-foreground">
              Showing {startIndex + 1}-{endIndex} of {data.length} entries
            </div>
            <div className="flex items-center space-x-2">
              <Button
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="w-4 h-4 mr-1" /> Previous
              </Button>
              <div className="inline-flex items-center space-x-1">
                {Array.from({ length: totalPages }).map((_, i) => (
                  <Button
                    key={i}
                    onClick={() => goToPage(i + 1)}
                    variant={currentPage === i + 1 ? "default" : "ghost"}
                  >
                    {i + 1}
                  </Button>
                ))}
              </div>
              <Button
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Next <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MasterProductionSchedule;
