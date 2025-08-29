import { useState } from "react";
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
import { ChevronLeft, ChevronRight, Download, Filter } from "lucide-react";

// Sample data for Material Requirement Planning
const generateMRPData = () => {
  const statuses = ["Required", "Ordered", "Received", "Shortage"];
  const materials = [
    "Steel Sheets", "Aluminum Rods", "Plastic Components", "Electronic Parts", "Fasteners",
    "Rubber Seals", "Glass Panels", "Copper Wire", "Ceramic Insulators", "Carbon Fiber"
  ];
  const suppliers = [
    "MetalCorp Ltd", "TechSupply Inc", "MaterialsPlus", "IndustrialGoods Co", "PrecisionParts"
  ];
  
  return Array.from({ length: 30 }, (_, i) => ({
    id: i + 1,
    materialCode: `MAT-${String(i + 1).padStart(4, '0')}`,
    materialName: materials[i % materials.length],
    requiredQty: Math.floor(Math.random() * 1000) + 100,
    availableQty: Math.floor(Math.random() * 500),
    shortfall: Math.max(0, Math.floor(Math.random() * 300) - 100),
    supplier: suppliers[i % suppliers.length],
    leadTime: Math.floor(Math.random() * 14) + 1,
    status: statuses[Math.floor(Math.random() * statuses.length)],
    plannedDate: new Date(2024, 0, 20 + i).toLocaleDateString()
  }));
};

const getStatusVariant = (status: string) => {
  switch (status) {
    case "Received":
      return "success";
    case "Ordered":
      return "warning";
    case "Required":
      return "secondary";
    case "Shortage":
      return "destructive";
    default:
      return "secondary";
  }
};

const MaterialRequirementPlanning = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const data = generateMRPData();
  
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = data.slice(startIndex, endIndex);

  const goToPage = (page: number) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  };

  // Calculate summary stats
  const totalRequired = data.reduce((sum, item) => sum + item.requiredQty, 0);
  const totalAvailable = data.reduce((sum, item) => sum + item.availableQty, 0);
  const totalShortfall = data.reduce((sum, item) => sum + item.shortfall, 0);
  const shortageItems = data.filter(item => item.status === "Shortage").length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Material Requirement Planning (MRP)
          </h1>
          <p className="text-muted-foreground">
            Monitor material requirements, availability, and procurement status
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="flex items-center gap-2">
            <Filter className="w-4 h-4" />
            Filter
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <Download className="w-4 h-4" />
            Export
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-foreground">{totalRequired.toLocaleString()}</div>
            <p className="text-sm text-muted-foreground">Total Required</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-success">{totalAvailable.toLocaleString()}</div>
            <p className="text-sm text-muted-foreground">Available Stock</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-destructive">{totalShortfall.toLocaleString()}</div>
            <p className="text-sm text-muted-foreground">Total Shortfall</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-warning">{shortageItems}</div>
            <p className="text-sm text-muted-foreground">Items in Shortage</p>
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-medium">
        <CardHeader>
          <CardTitle className="text-xl">Material Requirements Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="font-semibold">Material Code</TableHead>
                  <TableHead className="font-semibold">Material Name</TableHead>
                  <TableHead className="font-semibold">Required Qty</TableHead>
                  <TableHead className="font-semibold">Available Qty</TableHead>
                  <TableHead className="font-semibold">Shortfall</TableHead>
                  <TableHead className="font-semibold">Supplier</TableHead>
                  <TableHead className="font-semibold">Lead Time</TableHead>
                  <TableHead className="font-semibold">Status</TableHead>
                  <TableHead className="font-semibold">Planned Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentData.map((item) => (
                  <TableRow key={item.id} className="hover:bg-muted/50">
                    <TableCell className="font-medium font-mono text-sm">{item.materialCode}</TableCell>
                    <TableCell className="font-medium">{item.materialName}</TableCell>
                    <TableCell>{item.requiredQty.toLocaleString()}</TableCell>
                    <TableCell>{item.availableQty.toLocaleString()}</TableCell>
                    <TableCell className={item.shortfall > 0 ? "text-destructive font-medium" : ""}>
                      {item.shortfall > 0 ? item.shortfall.toLocaleString() : "-"}
                    </TableCell>
                    <TableCell className="text-sm">{item.supplier}</TableCell>
                    <TableCell>{item.leadTime} days</TableCell>
                    <TableCell>
                      <Badge variant={getStatusVariant(item.status) as any}>
                        {item.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm">{item.plannedDate}</TableCell>
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

export default MaterialRequirementPlanning;