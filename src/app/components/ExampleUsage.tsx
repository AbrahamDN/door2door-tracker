import React from "react";
import { useOutreach } from "@/app/context/OutreachContext";
import { doorStatusOptions } from "@/app/lib/options.constants";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

const ExampleUsage = () => {
  const { outreach, updatePostCodePrefix, addDoor, updateDoor, deleteDoor } =
    useOutreach();

  // State for form inputs
  const [doorNumber, setDoorNumber] = React.useState("");
  const [postcodePrefix, setPostcodePrefix] = React.useState("");
  const [streetName, setStreetName] = React.useState("");
  const [selectedStatus, setSelectedStatus] = React.useState<
    keyof typeof doorStatusOptions | undefined
  >(undefined);

  // Add a new door with imported status options
  const handleAddDoor = () => {
    if (!doorNumber || !postcodePrefix || !selectedStatus) return;

    addDoor({
      doorNumber,
      postcodePrefix,
      streetName,
      status: doorStatusOptions[selectedStatus], // Use selected status
    });

    // Reset form fields
    setDoorNumber("");
    setPostcodePrefix("");
    setStreetName("");
    setSelectedStatus(undefined);
  };

  // Update a door's status using imported options
  const handleUpdateDoor = () => {
    if (!outreach.doors.length) return;

    updateDoor(outreach.doors[0]?.id || "", {
      status: doorStatusOptions.closed, // Use imported status
    });
  };

  // Delete a door
  const handleDeleteDoor = () => {
    if (!outreach.doors.length) return;

    deleteDoor(outreach.doors[0]?.id || "");
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      {/* Card for Form */}
      <Card>
        <CardHeader>
          <CardTitle>Add or Manage Doors</CardTitle>
          <CardDescription>
            Use the form below to add or manage doors in the outreach.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Door Number Input */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Door Number
            </label>
            <Input
              placeholder="Enter door number (e.g., 123)"
              value={doorNumber}
              onChange={(e) => setDoorNumber(e.target.value)}
            />
          </div>

          {/* Postcode Prefix Input */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Postcode Prefix
            </label>
            <Input
              placeholder="Enter postcode prefix (e.g., SW1)"
              value={postcodePrefix}
              onChange={(e) => setPostcodePrefix(e.target.value)}
            />
          </div>

          {/* Street Name Input */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Street Name
            </label>
            <Input
              placeholder="Enter street name (e.g., Main Street)"
              value={streetName}
              onChange={(e) => setStreetName(e.target.value)}
            />
          </div>

          {/* Status Dropdown */}
          <div>
            <label className="block text-sm font-medium mb-1">Status</label>
            <Select
              value={selectedStatus}
              onValueChange={(value) =>
                setSelectedStatus(value as keyof typeof doorStatusOptions)
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a status" />
              </SelectTrigger>
              <SelectContent>
                {Object.keys(doorStatusOptions).map((key) => (
                  <SelectItem key={key} value={key}>
                    {doorStatusOptions[key as keyof typeof doorStatusOptions]
                      .icon &&
                      `${
                        doorStatusOptions[key as keyof typeof doorStatusOptions]
                          .icon
                      } `}
                    {
                      doorStatusOptions[key as keyof typeof doorStatusOptions]
                        .value
                    }
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-4">
            <Button onClick={handleAddDoor}>Add Door</Button>
            <Button variant="outline" onClick={handleUpdateDoor}>
              Update First Door
            </Button>
            <Button variant="destructive" onClick={handleDeleteDoor}>
              Delete First Door
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Display Outreach Data */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Current Outreach Data</CardTitle>
          <CardDescription>
            Below is the current state of the outreach object.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <pre className="whitespace-pre-wrap">
            {JSON.stringify(outreach, null, 2)}
          </pre>
        </CardContent>
      </Card>
    </div>
  );
};

export default ExampleUsage;
