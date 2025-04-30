"use client";
import {
  ArrowLeft,
  BarChart3,
  BookOpen,
  Calendar,
  ChevronRight,
  Clock,
  LineChart,
  TrendingUp,
} from "lucide-react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { ModuleCard } from "@/components/module-card";
import { VideoCard } from "@/components/video-card";

import Fin from "@/assets/fin.png";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function FinancialDashboard() {
  const moduleData = useQuery(api.modules.getModules);
  const [overallProgress, setoverallProgress] = useState(0)
  useEffect(() => {
    if (moduleData) {
      const totalModules = moduleData.length;

      const totalProgress = moduleData.reduce((sum, module) => sum + module.progress, 0);
      const overallProgress = totalModules > 0 ? (totalProgress / (100 * totalModules)) * 100 : 0;
      setoverallProgress(parseFloat(overallProgress.toFixed(2)));
    }
  }, [moduleData]);

  return (
    <main className="flex flex-col relative">
      <Link href={'/dashboard'} className="absolute top-10 left-10">
        <Button>
          <ArrowLeft/>Back
        </Button>
      </Link>
      <div className="flex-1 space-y-6 p-6">
        <div className="space-y-2 ml-40">
          <h1 className="text-3xl font-bold tracking-tight">
            Learning Journey
          </h1>
          <p className="text-muted-foreground">
            Welcome back, John! Continue your financial education journey.
          </p>
        </div>
        <div className="grid gap-4 grid-cols-3">
          <div className="grid gap-4 md:grid-cols-2 col-span-2">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Overall Progress
                </CardTitle>
                <LineChart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{overallProgress}%</div>
                <p className="text-xs text-muted-foreground">
                  +2.5% from last week
                </p>
                <div className="mt-3">
                  <Progress value={42} className="h-2" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Modules Completed
                </CardTitle>
                <BookOpen className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{moduleData?.reduce((count, module) => count + (module.progress === 100 ? 1 : 0), 0)}/{moduleData?.length}</div>
                <p className="text-xs text-muted-foreground">
                  33% completion rate
                </p>
                <div className="mt-3">
                  <Progress value={33} className="h-2" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Certificates Earned
                </CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2</div>
                <p className="text-xs text-muted-foreground">
                  +1 from last month
                </p>
                <div className="mt-3 grid grid-cols-5 gap-1">
                  <div className="h-2 rounded-full bg-teal-600"></div>
                  <div className="h-2 rounded-full bg-teal-600"></div>
                  <div className="h-2 rounded-full bg-muted"></div>
                  <div className="h-2 rounded-full bg-muted"></div>
                  <div className="h-2 rounded-full bg-muted"></div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Learning Streak
                </CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">5 days</div>
                <p className="text-xs text-muted-foreground">Keep it up!</p>
                <div className="mt-3 flex gap-1">
                  <div className="h-2 w-full rounded-full bg-teal-600"></div>
                  <div className="h-2 w-full rounded-full bg-teal-600"></div>
                  <div className="h-2 w-full rounded-full bg-teal-600"></div>
                  <div className="h-2 w-full rounded-full bg-teal-600"></div>
                  <div className="h-2 w-full rounded-full bg-teal-600"></div>
                  <div className="h-2 w-full rounded-full bg-muted"></div>
                  <div className="h-2 w-full rounded-full bg-muted"></div>
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="ml-auto relative ">
            <div className="bg-black text-white text-xs absolute rounded-xl shadow w-1/2 top-[45%] left-[-10%] p-3">
              Kya cheez hai yaar tu! You have completed 20% more content this
              week, then previous
            </div>
            <Image
              alt="mascot"
              src={Fin.src}
              height={Fin.height - 150}
              width={Fin.width - 150}
            />
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Card className="lg:col-span-4">
            <CardHeader>
              <CardTitle>Learning Progress</CardTitle>
              <CardDescription>
                Your progress across different financial topics
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[250px] w-full">
                <Image
                  src="/placeholder.svg?height=250&width=650&text=Progress+Chart"
                  width={650}
                  height={250}
                  alt="Progress Chart"
                  className="h-full w-full object-cover"
                />
              </div>
            </CardContent>
          </Card>
          <Card className="lg:col-span-3">
            <CardHeader>
              <CardTitle>Learning Path</CardTitle>
              <CardDescription>Your current learning journey</CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Badge
                      variant="outline"
                      className="bg-teal-50 text-teal-700 hover:bg-teal-50 dark:bg-teal-950 dark:text-teal-400"
                    >
                      Beginner
                    </Badge>
                    <span className="text-sm font-medium">
                      Personal Finance Basics
                    </span>
                  </div>
                  <span className="text-sm text-muted-foreground">65%</span>
                </div>
                <Progress value={75} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Badge
                      variant="outline"
                      className="bg-blue-50 text-blue-700 hover:bg-blue-50 dark:bg-blue-950 dark:text-blue-400"
                    >
                      Intermediate
                    </Badge>
                    <span className="text-sm font-medium">
                      Investment Strategies
                    </span>
                  </div>
                  <span className="text-sm text-muted-foreground">25%</span>
                </div>
                <Progress value={25} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Badge
                      variant="outline"
                      className="bg-purple-50 text-purple-700 hover:bg-purple-50 dark:bg-purple-950 dark:text-purple-400"
                    >
                      Advanced
                    </Badge>
                    <span className="text-sm font-medium">
                      Wealth Management
                    </span>
                  </div>
                  <span className="text-sm text-muted-foreground">5%</span>
                </div>
                <Progress value={5} className="h-2" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold tracking-tight">
              Continue Learning
            </h2>
            <Button variant="ghost" size="sm" className="gap-1">
              View All
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          <Tabs defaultValue="modules" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="modules">Modules</TabsTrigger>
              <TabsTrigger value="videos">Videos</TabsTrigger>
            </TabsList>
            <TabsContent value="modules" className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {moduleData?.map((module) => (
                  <ModuleCard
                    key={module._id}
                    id={module._id}
                    title={module.title}
                    description={module.description}
                    icon={<BarChart3 className="h-5 w-5 text-teal-600" />}
                    progress={module.progress}
                    level={
                      module.level as "beginner" | "intermediate" | "advanced"
                    }
                    duration="30 min"
                  />
                ))}
              </div>
            </TabsContent>
            <TabsContent value="videos" className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <VideoCard
                  title="How Credit Scores Actually Work"
                  description="A detailed explanation of the factors that influence your credit score."
                  duration="12:45"
                  level="beginner"
                  views="24K"
                />
                <VideoCard
                  title="Debt Snowball vs. Avalanche Method"
                  description="Compare two popular debt reduction strategies to find what works for you."
                  duration="18:30"
                  level="beginner"
                  views="15K"
                />
                <VideoCard
                  title="Index Funds Explained"
                  description="Learn why index funds are recommended for beginning investors."
                  duration="22:15"
                  level="intermediate"
                  views="32K"
                />
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold tracking-tight">
              Upcoming Sessions
            </h2>
            <Button variant="ghost" size="sm" className="gap-1">
              View Calendar
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">
                  Live Q&A: Retirement Planning
                </CardTitle>
                <CardDescription>
                  With Financial Advisor Sarah Johnson
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>Tomorrow, 2:00 PM</span>
                </div>
                <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span>60 minutes</span>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm" className="w-full">
                  Add to Calendar
                </Button>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">
                  Workshop: Creating a Budget
                </CardTitle>
                <CardDescription>
                  Interactive session with practical exercises
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>Friday, 11:00 AM</span>
                </div>
                <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span>90 minutes</span>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm" className="w-full">
                  Add to Calendar
                </Button>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">
                  Webinar: Tax Strategies
                </CardTitle>
                <CardDescription>
                  Learn how to optimize your tax situation
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>Next Monday, 3:00 PM</span>
                </div>
                <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span>60 minutes</span>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm" className="w-full">
                  Add to Calendar
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
}
