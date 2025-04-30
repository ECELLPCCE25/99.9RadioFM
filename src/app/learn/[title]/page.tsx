'use client'
import { useQuery } from "convex/react"
import { api } from "../../../../convex/_generated/api"
import { Id } from "../../../../convex/_generated/dataModel"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, CheckCircle, ChevronLeft, ChevronRight, Clock, Play, Trophy } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Mock data for a specific module
const moduleData = {
  id: "budgeting-basics",
  title: "Budgeting Basics",
  description: "Learn the fundamentals of creating and maintaining a budget",
  level: "Beginner",
  duration: "45 min",
  progress: 100,
  completed: true,
  points: 100,
  lessons: [
    {
      id: "intro",
      title: "Introduction to Budgeting",
      duration: "5 min",
      completed: true,
      videoUrl: "https://www.youtube.com/embed/hyABApQ4HoI?si=hgCV3XW8wVaM0jpO", // Budgeting 101 by Two Cents
    },
    {
      id: "income",
      title: "Understanding Income",
      duration: "10 min",
      completed: true,
      videoUrl: "https://www.youtube.com/embed/hrSUq4wcd0g", // Active vs Passive Income by The Financial Diet
    },
    {
      id: "expenses",
      title: "Tracking Expenses",
      duration: "10 min",
      completed: true,
      videoUrl: "https://www.youtube.com/embed/KgL3egde4iY", // How to Track Expenses by The Break Platform
    },
    {
      id: "categories",
      title: "Creating Budget Categories",
      duration: "10 min",
      completed: true,
      videoUrl: "https://www.youtube.com/embed/Jes4XMgi-LY", // Budgeting categories explained by Marko
    },
    {
      id: "tools",
      title: "Budgeting Tools and Apps",
      duration: "10 min",
      completed: true,
      videoUrl: "https://www.youtube.com/embed/EHdKYs6muks", // Best Budget Apps by The College Investor
    },
  ],
  quiz: [
    {
      question: "What is the 50/30/20 rule in budgeting?",
      options: [
        "50% needs, 30% wants, 20% savings",
        "50% savings, 30% needs, 20% wants",
        "50% wants, 30% savings, 20% needs",
        "50% income, 30% expenses, 20% debt",
      ],
      correctAnswer: 0,
    },
    {
      question: "Which of the following is NOT a common budgeting method?",
      options: ["Zero-based budgeting", "Envelope system", "50/30/20 rule", "Reverse allocation method"],
      correctAnswer: 3,
    },
    {
      question: "What should you do first when creating a budget?",
      options: ["Set financial goals", "Track your expenses", "Calculate your income", "Create spending categories"],
      correctAnswer: 2,
    },
  ],
}

export default function ModulePage({ params }: { params: { title: Id<"modules"> } }) {
    const { title } = params
    const data = useQuery(api.modules.getModule, { id: title })
    console.log(data)
  const [activeTab, setActiveTab] = useState("lessons")
  const [currentLesson, setCurrentLesson] = useState(0)
  const [quizAnswers, setQuizAnswers] = useState<number[]>([])
  const [quizSubmitted, setQuizSubmitted] = useState(false)

  const handleNextLesson = () => {
    if (currentLesson < moduleData.lessons.length - 1) {
      setCurrentLesson(currentLesson + 1)
    } else {
      setActiveTab("quiz")
    }
  }

  const handlePrevLesson = () => {
    if (currentLesson > 0) {
      setCurrentLesson(currentLesson - 1)
    }
  }

  const handleQuizAnswer = (questionIndex: number, answerIndex: number) => {
    const newAnswers = [...quizAnswers]
    newAnswers[questionIndex] = answerIndex
    setQuizAnswers(newAnswers)
  }

  const handleQuizSubmit = () => {
    setQuizSubmitted(true)
  }

  const correctAnswers = quizSubmitted
    ? quizAnswers.filter((answer, index) => answer === moduleData.quiz[index].correctAnswer).length
    : 0

  return (
    <div className="w-full px-10 py-8">
      <div className="mb-8">
        <Link href="/learn" className="mb-4 flex items-center text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Learning Center
        </Link>
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-3xl font-bold">{data?.title}</h1>
              <Badge variant="outline">{data?.level}</Badge>
            </div>
            <p className="text-muted-foreground">{moduleData.description}</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-muted-foreground" />
              <span>{moduleData.duration}</span>
            </div>
            <div className="flex items-center gap-2">
              <Trophy className="h-5 w-5 text-yellow-500" />
              <span>{moduleData.points} Points</span>
            </div>
          </div>
        </div>
        <div className="mt-4">
          <div className="mb-2 flex items-center justify-between text-sm">
            <span>Overall Progress</span>
            <span>{data?.progress}%</span>
          </div>
          <Progress value={data?.progress} className="h-2" />
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-8">
          <TabsTrigger value="lessons">Lessons</TabsTrigger>
          <TabsTrigger value="quiz">Quiz</TabsTrigger>
        </TabsList>

        <TabsContent value="lessons">
          <div className="grid gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <Card className="overflow-hidden">
                <div className="aspect-video w-full bg-black">
                  <iframe
                    src={moduleData.lessons[currentLesson].videoUrl}
                    className="h-full w-full"
                    allowFullScreen
                    title={moduleData.lessons[currentLesson].title}
                  ></iframe>
                </div>
                <CardHeader>
                  <CardTitle>{moduleData.lessons[currentLesson].title}</CardTitle>
                  <CardDescription>
                    Lesson {currentLesson + 1} of {moduleData.lessons.length} •{" "}
                    {moduleData.lessons[currentLesson].duration}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p>
                    {data?.description}
                  </p>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" onClick={handlePrevLesson} disabled={currentLesson === 0}>
                    <ChevronLeft className="mr-2 h-4 w-4" />
                    Previous
                  </Button>
                  <Button onClick={handleNextLesson}>
                    {currentLesson < moduleData.lessons.length - 1 ? (
                      <>
                        Next
                        <ChevronRight className="ml-2 h-4 w-4" />
                      </>
                    ) : (
                      "Take Quiz"
                    )}
                  </Button>
                </CardFooter>
              </Card>
            </div>

            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Lessons</CardTitle>
                  <CardDescription>
                    {moduleData.lessons.filter((l) => l.completed).length} of {moduleData.lessons.length} completed
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {moduleData.lessons.map((lesson, index) => (
                      <div
                        key={lesson.id}
                        className={`flex cursor-pointer items-center gap-3 rounded-lg p-3 transition-colors ${
                          currentLesson === index ? "bg-primary text-primary-foreground" : "hover:bg-muted"
                        }`}
                        onClick={() => setCurrentLesson(index)}
                      >
                        <div
                          className={`flex h-8 w-8 items-center justify-center rounded-full ${
                            currentLesson === index
                              ? "bg-primary-foreground text-primary"
                              : lesson.completed
                                ? "bg-primary/20 text-primary"
                                : "bg-muted text-muted-foreground"
                          }`}
                        >
                          {lesson.completed ? <CheckCircle className="h-4 w-4" /> : index + 1}
                        </div>
                        <div className="flex-1">
                          <div className="font-medium">{lesson.title}</div>
                          <div
                            className={`text-xs ${currentLesson === index ? "text-primary-foreground/80" : "text-muted-foreground"}`}
                          >
                            {lesson.duration}
                          </div>
                        </div>
                        {currentLesson === index && <Play className="h-4 w-4" />}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="quiz">
          <Card>
            <CardHeader>
              <CardTitle>Module Quiz</CardTitle>
              <CardDescription>
                Test your knowledge of budgeting basics. You need to score at least 70% to complete this module.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {moduleData.quiz.map((question, qIndex) => (
                  <div key={qIndex} className="space-y-4">
                    <h3 className="font-medium">
                      {qIndex + 1}. {question.question}
                    </h3>
                    <div className="space-y-2">
                      {question.options.map((option, oIndex) => (
                        <div
                          key={oIndex}
                          className={`flex cursor-pointer items-center gap-3 rounded-lg border p-3 transition-colors ${
                            quizAnswers[qIndex] === oIndex
                              ? quizSubmitted
                                ? oIndex === question.correctAnswer
                                  ? "border-green-500 bg-green-50 dark:bg-green-950"
                                  : "border-red-500 bg-red-50 dark:bg-red-950"
                                : "border-primary bg-primary/5"
                              : quizSubmitted && oIndex === question.correctAnswer
                                ? "border-green-500 bg-green-50 dark:bg-green-950"
                                : ""
                          } ${quizSubmitted ? "cursor-default" : "hover:bg-muted"}`}
                          onClick={() => !quizSubmitted && handleQuizAnswer(qIndex, oIndex)}
                        >
                          <div
                            className={`flex h-6 w-6 items-center justify-center rounded-full border ${
                              quizAnswers[qIndex] === oIndex
                                ? quizSubmitted
                                  ? oIndex === question.correctAnswer
                                    ? "border-green-500 text-green-500"
                                    : "border-red-500 text-red-500"
                                  : "border-primary text-primary"
                                : quizSubmitted && oIndex === question.correctAnswer
                                  ? "border-green-500 text-green-500"
                                  : ""
                            }`}
                          >
                            {String.fromCharCode(65 + oIndex)}
                          </div>
                          <div className="flex-1">{option}</div>
                          {quizSubmitted && oIndex === question.correctAnswer && (
                            <CheckCircle className="h-4 w-4 text-green-500" />
                          )}
                        </div>
                      ))}
                    </div>
                    {quizSubmitted && quizAnswers[qIndex] !== question.correctAnswer && (
                      <div className="rounded-lg bg-muted p-3 text-sm">
                        <span className="font-medium">Correct Answer:</span> {question.options[question.correctAnswer]}
                      </div>
                    )}
                    {qIndex < moduleData.quiz.length - 1 && <Separator className="my-4" />}
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex flex-col items-start gap-4">
              {quizSubmitted ? (
                <div className="w-full rounded-lg bg-muted p-4">
                  <h3 className="mb-2 text-lg font-medium">Quiz Results</h3>
                  <p>
                    You scored {correctAnswers} out of {moduleData.quiz.length} (
                    {Math.round((correctAnswers / moduleData.quiz.length) * 100)}%)
                  </p>
                  {correctAnswers / moduleData.quiz.length >= 0.7 ? (
                    <div className="mt-4">
                      <p className="mb-2 text-green-500">Congratulations! You&apos;ve passed the quiz.</p>
                      <Button asChild>
                        <Link href="/learn">Return to Learning Center</Link>
                      </Button>
                    </div>
                  ) : (
                    <div className="mt-4">
                      <p className="mb-2 text-yellow-500">
                        You need to score at least 70% to pass. Please review the material and try again.
                      </p>
                      <Button variant="outline" onClick={() => setActiveTab("lessons")}>
                        Review Lessons
                      </Button>
                    </div>
                  )}
                </div>
              ) : (
                <Button
                  onClick={handleQuizSubmit}
                  disabled={quizAnswers.length < moduleData.quiz.length}
                  className="w-full"
                >
                  Submit Quiz
                </Button>
              )}
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
