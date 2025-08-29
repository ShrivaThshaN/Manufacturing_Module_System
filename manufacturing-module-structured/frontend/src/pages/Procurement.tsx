import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";

// Sample data for Purchase Orders
const generatePOData = () => {
  const statuses = ["Pending Approval", "Sent to Vendor", "Fulfilled"];
  const vendors = [
    "Acme Corp", "Stellar Industries", "Global Supply Co", "Premier Materials",
    "Elite Components", "Quantum Systems", "Precision Parts", "Advanced Tech",
    "Industrial Solutions", "Quality Materials"
  ];
  
  return Array.from({ length: 30 }, (_, i) => ({
    id: i + 1,
    poNumber: `PO-2024-${String(i + 1).padStart(3, '0')}`,
    vendorName: vendors[i % vendors.length],
    creationDate: new Date(2024, 0, 1 + i).toLocaleDateString(),
    status: statuses[Math.floor(Math.random() * statuses.length)],
    totalAmount: (Math.random() * 50000 + 1000).toFixed(2)
  }));
};

const getStatusVariant = (status: string) => {
  switch (status) {
    case "Fulfilled":
      return "success";
    case "Sent to Vendor":
      return "accent";
    case "Pending Approval":
      return "warning";
    default:
      return "secondary";
  }
};

const Procurement = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const data = generatePOData();
  
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = data.slice(startIndex, endIndex);

  const goToPage = (page: number) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Procurement & Purchase Orders
          </h1>
          <p className="text-muted-foreground">
            Manage purchase orders and vendor relationships
          </p>
        </div>
        <Button variant="accent" size="lg" className="shadow-medium">
          <Plus className="w-5 h-5 mr-2" />
          Create New Purchase Order
        </Button>
      </div>

      <Card className="shadow-medium">
        <CardHeader>
          <CardTitle className="text-xl">Purchase Orders</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="font-semibold">PO Number</TableHead>
                  <TableHead className="font-semibold">Vendor Name</TableHead>
                  <TableHead className="font-semibold">Creation Date</TableHead>
                  <TableHead className="font-semibold">Status</TableHead>
                  <TableHead className="font-semibold text-right">Total Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentData.map((item) => (
                  <TableRow key={item.id} className="hover:bg-muted/50">
                    <TableCell className="font-medium">{item.poNumber}</TableCell>
                    <TableCell>{item.vendorName}</TableCell>
                    <TableCell className="text-muted-foreground">{item.creationDate}</TableCell>
                    <TableCell>
                      <Badge variant={getStatusVariant(item.status) as any}>
                        {item.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right font-medium">
                      ${parseFloat(item.totalAmount).toLocaleString()}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between mt-6">
            <div className="text-sm text-muted-foreground">
              Showing {startIndex + 1}-{Math.min(endIndex, data.length)} of {data.length} entries
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="w-4 h-4 mr-1" />
                Previous
              </Button>
              
              <div className="flex space-x-1">
                {Array.from({ length: totalPages }, (_, i) => (
                  <Button
                    key={i + 1}
                    variant={currentPage === i + 1 ? "default" : "outline"}
                    size="sm"
                    onClick={() => goToPage(i + 1)}
                    className="w-10"
                  >
                    {i + 1}
                  </Button>
                ))}
              </div>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Next
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Procurement;