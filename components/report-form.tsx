"use client"

import type React from "react"

import { useState } from "react"
import { Camera, MapPin, Upload, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"

export default function ReportForm() {
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    location: "",
    waterLevel: "",
    description: "",
    image: null as File | null,
  })
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    if (file) {
      setFormData({ ...formData, image: file })
      setPreviewUrl(URL.createObjectURL(file))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.location || !formData.waterLevel) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Report submitted",
        description: "Thank you for contributing to flood monitoring!",
      })

      // Reset form
      setFormData({
        location: "",
        waterLevel: "",
        description: "",
        image: null,
      })
      setPreviewUrl(null)
      setIsSubmitting(false)
    }, 1500)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="location">
          Location <span className="text-red-500">*</span>
        </Label>
        <div className="flex gap-2">
          <Input
            id="location"
            placeholder="Enter location name"
            value={formData.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            required
          />
          <Button type="button" variant="outline" size="icon">
            <MapPin className="h-4 w-4" />
          </Button>
        </div>
        <p className="text-xs text-muted-foreground">Click the pin icon to use your current location</p>
      </div>

      <div className="space-y-2">
        <Label>
          Water Level <span className="text-red-500">*</span>
        </Label>
        <RadioGroup
          value={formData.waterLevel}
          onValueChange={(value) => setFormData({ ...formData, waterLevel: value })}
          className="flex flex-wrap gap-4"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="ankle" id="ankle" />
            <Label htmlFor="ankle" className="cursor-pointer">
              Ankle deep
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="knee" id="knee" />
            <Label htmlFor="knee" className="cursor-pointer">
              Knee deep
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="waist" id="waist" />
            <Label htmlFor="waist" className="cursor-pointer">
              Waist deep
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="above-waist" id="above-waist" />
            <Label htmlFor="above-waist" className="cursor-pointer">
              Above waist
            </Label>
          </div>
        </RadioGroup>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Additional Details</Label>
        <Textarea
          id="description"
          placeholder="Describe the situation (optional)"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          rows={3}
        />
      </div>

      <div className="space-y-2">
        <Label>Photo Evidence</Label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div
            className={`border-2 border-dashed rounded-lg p-4 flex flex-col items-center justify-center text-center h-40
               ${previewUrl ? "border-primary/30 bg-primary/5" : "border-muted-foreground/20"}`}
          >
            {previewUrl ? (
              <div className="relative w-full h-full">
                <img
                  src={previewUrl || "/placeholder.svg"}
                  alt="Preview"
                  className="object-cover w-full h-full rounded"
                />
                <Button
                  type="button"
                  variant="destructive"
                  size="icon"
                  className="absolute top-1 right-1 h-6 w-6"
                  onClick={() => {
                    setPreviewUrl(null)
                    setFormData({ ...formData, image: null })
                  }}
                >
                  ×
                </Button>
              </div>
            ) : (
              <>
                <Camera className="h-10 w-10 text-muted-foreground mb-2" />
                <p className="text-sm text-muted-foreground">Upload a photo of the flooding</p>
                <div className="mt-4 flex gap-2">
                  <Button type="button" size="sm" className="relative">
                    <Camera className="mr-1 h-4 w-4" />
                    Take Photo
                    <input
                      type="file"
                      accept="image/*"
                      capture="environment"
                      onChange={handleImageChange}
                      className="absolute inset-0 opacity-0 cursor-pointer"
                    />
                  </Button>
                  <Button type="button" variant="outline" size="sm" className="relative">
                    <Upload className="mr-1 h-4 w-4" />
                    Upload
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="absolute inset-0 opacity-0 cursor-pointer"
                    />
                  </Button>
                </div>
              </>
            )}
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Check className="h-4 w-4 text-green-500" />
              <span className="text-sm">Photos help verify flood reports</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="h-4 w-4 text-green-500" />
              <span className="text-sm">Our AI analyzes water depth</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="h-4 w-4 text-green-500" />
              <span className="text-sm">Earn badges for quality reports</span>
            </div>
          </div>
        </div>
      </div>

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? (
          <>
            <span className="animate-spin mr-2">◌</span>
            Submitting...
          </>
        ) : (
          "Submit Flood Report"
        )}
      </Button>
    </form>
  )
}

