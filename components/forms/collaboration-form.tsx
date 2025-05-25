'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { toast } from 'sonner'
import { 
  Users, 
  Code, 
  Palette, 
  Music, 
  DollarSign, 
  Megaphone,
  Shield,
  BookOpen,
  Handshake,
  Send
} from 'lucide-react'

// Form validation schema
const collaborationSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  company: z.string().optional(),
  website: z.string().url('Please enter a valid URL').optional().or(z.literal('')),
  collaborationType: z.string().min(1, 'Please select a collaboration type'),
  skills: z.array(z.string()).min(1, 'Please select at least one skill area'),
  experience: z.string().min(1, 'Please select your experience level'),
  availability: z.string().min(1, 'Please select your availability'),
  projectInterest: z.array(z.string()).min(1, 'Please select at least one area of interest'),
  budget: z.string().optional(),
  timeline: z.string().optional(),
  description: z.string().min(50, 'Please provide at least 50 characters describing your collaboration idea'),
  portfolio: z.string().url('Please enter a valid URL').optional().or(z.literal('')),
  socialMedia: z.string().optional(),
  agreeToTerms: z.boolean().refine(val => val === true, 'You must agree to the terms'),
})

type CollaborationFormData = z.infer<typeof collaborationSchema>

const collaborationTypes = [
  { value: 'developer', label: 'Developer/Technical', icon: Code },
  { value: 'designer', label: 'UI/UX Designer', icon: Palette },
  { value: 'artist', label: 'Music Producer/Artist', icon: Music },
  { value: 'investor', label: 'Investor/Sponsor', icon: DollarSign },
  { value: 'marketing', label: 'Marketing/Community', icon: Megaphone },
  { value: 'security', label: 'Security Expert', icon: Shield },
  { value: 'content', label: 'Content Creator', icon: BookOpen },
  { value: 'business', label: 'Business Development', icon: Handshake },
]

const skillAreas = [
  'Frontend Development (React/Next.js)',
  'Backend Development (Node.js/Python)',
  'Web3/Blockchain Development',
  'Smart Contract Development',
  'UI/UX Design',
  'Graphic Design',
  'Music Production',
  'Audio Engineering',
  'Content Writing',
  'Technical Writing',
  'Marketing Strategy',
  'Social Media Management',
  'Community Management',
  'Business Development',
  'Project Management',
  'Security Auditing',
  'DevOps/Infrastructure',
  'Mobile Development',
  'Video Production',
  'Photography',
]

const experienceLevels = [
  { value: 'beginner', label: 'Beginner (0-2 years)' },
  { value: 'intermediate', label: 'Intermediate (2-5 years)' },
  { value: 'advanced', label: 'Advanced (5-10 years)' },
  { value: 'expert', label: 'Expert (10+ years)' },
]

const availabilityOptions = [
  { value: 'part-time', label: 'Part-time (5-20 hours/week)' },
  { value: 'full-time', label: 'Full-time (40+ hours/week)' },
  { value: 'project-based', label: 'Project-based' },
  { value: 'consulting', label: 'Consulting/Advisory' },
  { value: 'volunteer', label: 'Volunteer/Open Source' },
]

const projectInterests = [
  'E-commerce Platform Development',
  'Web3 Integration',
  'NFT Marketplace',
  'Payment Processing',
  'Mobile App Development',
  'Community Building',
  'Content Creation',
  'Marketing & Growth',
  'Security & Auditing',
  'Documentation',
  'User Testing',
  'Business Strategy',
]

export function CollaborationForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [selectedSkills, setSelectedSkills] = useState<string[]>([])
  const [selectedInterests, setSelectedInterests] = useState<string[]>([])

  const form = useForm<CollaborationFormData>({
    resolver: zodResolver(collaborationSchema),
    defaultValues: {
      name: '',
      email: '',
      company: '',
      website: '',
      collaborationType: '',
      skills: [],
      experience: '',
      availability: '',
      projectInterest: [],
      budget: '',
      timeline: '',
      description: '',
      portfolio: '',
      socialMedia: '',
      agreeToTerms: false,
    },
  })

  const handleSkillChange = (skill: string, checked: boolean) => {
    const updatedSkills = checked
      ? [...selectedSkills, skill]
      : selectedSkills.filter(s => s !== skill)
    
    setSelectedSkills(updatedSkills)
    form.setValue('skills', updatedSkills)
  }

  const handleInterestChange = (interest: string, checked: boolean) => {
    const updatedInterests = checked
      ? [...selectedInterests, interest]
      : selectedInterests.filter(i => i !== interest)
    
    setSelectedInterests(updatedInterests)
    form.setValue('projectInterest', updatedInterests)
  }

  const onSubmit = async (data: CollaborationFormData) => {
    setIsSubmitting(true)
    
    try {
      // Here you would typically send the data to your backend
      console.log('Collaboration form data:', data)
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      toast.success('Collaboration request submitted successfully! We\'ll be in touch soon.')
      form.reset()
      setSelectedSkills([])
      setSelectedInterests([])
    } catch (error) {
      toast.error('Failed to submit collaboration request. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-2xl">
          <Users className="h-6 w-6" />
          Collaborate With Us
        </CardTitle>
        <p className="text-muted-foreground">
          Join our mission to build the future of creative commerce. Whether you're a developer, 
          designer, artist, investor, or have other skills to contribute, we'd love to hear from you.
        </p>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {/* Basic Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Basic Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
                  {...form.register('name')}
                  placeholder="Your full name"
                />
                {form.formState.errors.name && (
                  <p className="text-sm text-destructive">{form.formState.errors.name.message}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  {...form.register('email')}
                  placeholder="your.email@example.com"
                />
                {form.formState.errors.email && (
                  <p className="text-sm text-destructive">{form.formState.errors.email.message}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="company">Company/Organization</Label>
                <Input
                  id="company"
                  {...form.register('company')}
                  placeholder="Your company or organization"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="website">Website/Portfolio</Label>
                <Input
                  id="website"
                  {...form.register('website')}
                  placeholder="https://yourwebsite.com"
                />
                {form.formState.errors.website && (
                  <p className="text-sm text-destructive">{form.formState.errors.website.message}</p>
                )}
              </div>
            </div>
          </div>

          {/* Collaboration Type */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Collaboration Type *</h3>
            <Select onValueChange={(value) => form.setValue('collaborationType', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select your primary collaboration type" />
              </SelectTrigger>
              <SelectContent>
                {collaborationTypes.map((type) => {
                  const Icon = type.icon
                  return (
                    <SelectItem key={type.value} value={type.value}>
                      <div className="flex items-center gap-2">
                        <Icon className="h-4 w-4" />
                        {type.label}
                      </div>
                    </SelectItem>
                  )
                })}
              </SelectContent>
            </Select>
            {form.formState.errors.collaborationType && (
              <p className="text-sm text-destructive">{form.formState.errors.collaborationType.message}</p>
            )}
          </div>

          {/* Skills */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Skills & Expertise *</h3>
            <p className="text-sm text-muted-foreground">Select all that apply to your skillset</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {skillAreas.map((skill) => (
                <div key={skill} className="flex items-center space-x-2">
                  <Checkbox
                    id={skill}
                    checked={selectedSkills.includes(skill)}
                    onCheckedChange={(checked) => handleSkillChange(skill, checked as boolean)}
                  />
                  <Label htmlFor={skill} className="text-sm font-normal cursor-pointer">
                    {skill}
                  </Label>
                </div>
              ))}
            </div>
            {form.formState.errors.skills && (
              <p className="text-sm text-destructive">{form.formState.errors.skills.message}</p>
            )}
          </div>

          {/* Experience & Availability */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label>Experience Level *</Label>
              <Select onValueChange={(value) => form.setValue('experience', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select your experience level" />
                </SelectTrigger>
                <SelectContent>
                  {experienceLevels.map((level) => (
                    <SelectItem key={level.value} value={level.value}>
                      {level.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {form.formState.errors.experience && (
                <p className="text-sm text-destructive">{form.formState.errors.experience.message}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label>Availability *</Label>
              <Select onValueChange={(value) => form.setValue('availability', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select your availability" />
                </SelectTrigger>
                <SelectContent>
                  {availabilityOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {form.formState.errors.availability && (
                <p className="text-sm text-destructive">{form.formState.errors.availability.message}</p>
              )}
            </div>
          </div>

          {/* Project Interests */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Project Interests *</h3>
            <p className="text-sm text-muted-foreground">What aspects of the project interest you most?</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {projectInterests.map((interest) => (
                <div key={interest} className="flex items-center space-x-2">
                  <Checkbox
                    id={interest}
                    checked={selectedInterests.includes(interest)}
                    onCheckedChange={(checked) => handleInterestChange(interest, checked as boolean)}
                  />
                  <Label htmlFor={interest} className="text-sm font-normal cursor-pointer">
                    {interest}
                  </Label>
                </div>
              ))}
            </div>
            {form.formState.errors.projectInterest && (
              <p className="text-sm text-destructive">{form.formState.errors.projectInterest.message}</p>
            )}
          </div>

          {/* Additional Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Additional Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="budget">Budget Range (if applicable)</Label>
                <Input
                  id="budget"
                  {...form.register('budget')}
                  placeholder="e.g., $5,000 - $10,000"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="timeline">Preferred Timeline</Label>
                <Input
                  id="timeline"
                  {...form.register('timeline')}
                  placeholder="e.g., 3-6 months"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Collaboration Description *</Label>
              <Textarea
                id="description"
                {...form.register('description')}
                placeholder="Tell us about your collaboration idea, what you'd like to contribute, and what you hope to achieve..."
                rows={5}
              />
              {form.formState.errors.description && (
                <p className="text-sm text-destructive">{form.formState.errors.description.message}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="portfolio">Portfolio/Work Examples</Label>
              <Input
                id="portfolio"
                {...form.register('portfolio')}
                placeholder="https://github.com/username or https://portfolio.com"
              />
              {form.formState.errors.portfolio && (
                <p className="text-sm text-destructive">{form.formState.errors.portfolio.message}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="socialMedia">Social Media/Contact</Label>
              <Input
                id="socialMedia"
                {...form.register('socialMedia')}
                placeholder="Discord, Twitter, LinkedIn, etc."
              />
            </div>
          </div>

          {/* Terms Agreement */}
          <div className="space-y-4">
            <div className="flex items-start space-x-2">
              <Checkbox
                id="agreeToTerms"
                {...form.register('agreeToTerms')}
              />
              <Label htmlFor="agreeToTerms" className="text-sm leading-relaxed cursor-pointer">
                I agree to the collaboration terms and understand that this is an initial inquiry. 
                I consent to being contacted regarding potential collaboration opportunities with Its Different Productions.
              </Label>
            </div>
            {form.formState.errors.agreeToTerms && (
              <p className="text-sm text-destructive">{form.formState.errors.agreeToTerms.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <Button 
            type="submit" 
            className="w-full" 
            disabled={isSubmitting}
            size="lg"
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                Submitting...
              </>
            ) : (
              <>
                <Send className="h-4 w-4 mr-2" />
                Submit Collaboration Request
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
