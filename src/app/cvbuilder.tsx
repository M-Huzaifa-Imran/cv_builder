"use client"

import { useState, useRef } from "react"
import { motion } from "framer-motion"
import { PlusCircle, Trash2, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import html2canvas from "html2canvas"
import jsPDF from "jspdf"

export default function ProfessionalResumeBuilder() {
    const [personalInfo, setPersonalInfo] = useState({
        name: "",
        email: "",
        phone: "",
        summary: "",
    })
    const [experiences, setExperiences] = useState([{ company: "", position: "", duration: "", description: "" }])
    const [education, setEducation] = useState([{ school: "", degree: "", year: "" }])
    const [skills, setSkills] = useState([""])
    const resumeRef = useRef(null)

    const handlePersonalInfoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setPersonalInfo({ ...personalInfo, [e.target.name]: e.target.value })
    }

    const handleExperienceChange = (index: number, e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const newExperiences = [...experiences]
        newExperiences[index] = { ...newExperiences[index], [e.target.name]: e.target.value }
        setExperiences(newExperiences)
    }

    const handleEducationChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
        const newEducation = [...education]
        newEducation[index] = { ...newEducation[index], [e.target.name]: e.target.value }
        setEducation(newEducation)
    }

    const handleSkillChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
        const newSkills = [...skills]
        newSkills[index] = e.target.value
        setSkills(newSkills)
    }

    const addExperience = () => {
        setExperiences([...experiences, { company: "", position: "", duration: "", description: "" }])
    }

    const addEducation = () => {
        setEducation([...education, { school: "", degree: "", year: "" }])
    }

    const addSkill = () => {
        setSkills([...skills, ""])
    }

    const removeExperience = (index: number) => {
        setExperiences(experiences.filter((_, i) => i !== index))
    }

    const removeEducation = (index: number) => {
        setEducation(education.filter((_, i) => i !== index))
    }

    const removeSkill = (index: number) => {
        setSkills(skills.filter((_, i) => i !== index))
    }

    const downloadResume = async () => {
        if (resumeRef.current) {
            const canvas = await html2canvas(resumeRef.current)
            const imgData = canvas.toDataURL('image/png')
            const pdf = new jsPDF('p', 'mm', 'a4')
            const pdfWidth = pdf.internal.pageSize.getWidth()
            const pdfHeight = pdf.internal.pageSize.getHeight()
            const imgWidth = canvas.width
            const imgHeight = canvas.height
            const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight)
            const imgX = (pdfWidth - imgWidth * ratio) / 2
            const imgY = 30
            pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio)
            pdf.save('resume.pdf')
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-8">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="max-w-6xl mx-auto bg-white rounded-xl shadow-2xl overflow-hidden"
            >
                <div className="p-8 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
                    <h1 className="text-4xl font-bold mb-2">Resume Builder</h1>
                    <p className="text-blue-100">Create a simple resume in minutes</p>
                </div>
                <div className="p-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="space-y-8">
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-2xl font-semibold text-blue-700">Personal Information</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <Input
                                    name="name"
                                    placeholder="Full Name"
                                    value={personalInfo.name}
                                    onChange={handlePersonalInfoChange}
                                    className="border-blue-200 focus:ring-blue-500"
                                />
                                <Input
                                    name="email"
                                    type="email"
                                    placeholder="Email"
                                    value={personalInfo.email}
                                    onChange={handlePersonalInfoChange}
                                    className="border-blue-200 focus:ring-blue-500"
                                />
                                <Input
                                    name="phone"
                                    placeholder="Phone"
                                    value={personalInfo.phone}
                                    onChange={handlePersonalInfoChange}
                                    className="border-blue-200 focus:ring-blue-500"
                                />
                                <Textarea
                                    name="summary"
                                    placeholder="Professional Summary"
                                    value={personalInfo.summary}
                                    onChange={handlePersonalInfoChange}
                                    className="border-blue-200 focus:ring-blue-500"
                                />
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-2xl font-semibold text-blue-700">Work Experience</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {experiences.map((exp, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.3, delay: index * 0.1 }}
                                        className="space-y-4 p-4 border border-blue-100 rounded-md relative bg-blue-50"
                                    >
                                        <Input
                                            name="company"
                                            placeholder="Company"
                                            value={exp.company}
                                            onChange={(e) => handleExperienceChange(index, e)}
                                            className="border-blue-200 focus:ring-blue-500"
                                        />
                                        <Input
                                            name="position"
                                            placeholder="Position"
                                            value={exp.position}
                                            onChange={(e) => handleExperienceChange(index, e)}
                                            className="border-blue-200 focus:ring-blue-500"
                                        />
                                        <Input
                                            name="duration"
                                            placeholder="Duration"
                                            value={exp.duration}
                                            onChange={(e) => handleExperienceChange(index, e)}
                                            className="border-blue-200 focus:ring-blue-500"
                                        />
                                        <Textarea
                                            name="description"
                                            placeholder="Job Description"
                                            value={exp.description}
                                            onChange={(e) => handleExperienceChange(index, e)}
                                            className="border-blue-200 focus:ring-blue-500"
                                        />
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="absolute top-2 right-2 text-blue-500 hover:text-blue-600 hover:bg-blue-100"
                                            onClick={() => removeExperience(index)}
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </motion.div>
                                ))}
                                <Button onClick={addExperience} className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                                    <PlusCircle className="mr-2 h-4 w-4" /> Add Experience
                                </Button>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-2xl font-semibold text-blue-700">Education</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {education.map((edu, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.3, delay: index * 0.1 }}
                                        className="space-y-4 p-4 border border-blue-100 rounded-md relative bg-blue-50"
                                    >
                                        <Input
                                            name="school"
                                            placeholder="School"
                                            value={edu.school}
                                            onChange={(e) => handleEducationChange(index, e)}
                                            className="border-blue-200 focus:ring-blue-500"
                                        />
                                        <Input
                                            name="degree"
                                            placeholder="Degree"
                                            value={edu.degree}
                                            onChange={(e) => handleEducationChange(index, e)}
                                            className="border-blue-200 focus:ring-blue-500"
                                        />
                                        <Input
                                            name="year"
                                            placeholder="Year"
                                            value={edu.year}
                                            onChange={(e) => handleEducationChange(index, e)}
                                            className="border-blue-200 focus:ring-blue-500"
                                        />
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="absolute top-2 right-2 text-blue-500 hover:text-blue-600 hover:bg-blue-100"
                                            onClick={() => removeEducation(index)}
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </motion.div>
                                ))}
                                <Button onClick={addEducation} className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                                    <PlusCircle className="mr-2 h-4 w-4" /> Add Education
                                </Button>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-2xl font-semibold text-blue-700">Skills</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {skills.map((skill, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.3, delay: index * 0.1 }}
                                        className="flex items-center space-x-2"
                                    >
                                        <Input
                                            placeholder="Skill"
                                            value={skill}
                                            onChange={(e) => handleSkillChange(index, e)}
                                            className="border-blue-200 focus:ring-blue-500 bg-blue-50"
                                        />
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => removeSkill(index)}
                                            className="text-blue-500 hover:text-blue-600 hover:bg-blue-100"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </motion.div>
                                ))}
                                <Button onClick={addSkill} className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                                    <PlusCircle className="mr-2 h-4 w-4" /> Add Skill
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                    <div className="lg:sticky lg:top-8 lg:self-start">
                        <Card className="bg-white shadow-xl">
                            <CardHeader>
                                <CardTitle className="text-2xl font-semibold text-blue-700">Resume Preview</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <motion.div
                                    ref={resumeRef}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.5, delay: 0.2 }}
                                    className="space-y-6 p-6 bg-blue-50 rounded-lg"
                                >
                                    <div>
                                        <h3 className="text-2xl font-bold text-blue-800">{personalInfo.name}</h3>
                                        <p className="text-blue-600">{personalInfo.email} | {personalInfo.phone}</p>
                                        <p className="mt-2 text-gray-700">{personalInfo.summary}</p>
                                    </div>
                                    <Separator className="bg-blue-200" />
                                    <div>
                                        <h4 className="text-xl font-semibold text-blue-700 mb-2">Work Experience</h4>
                                        {experiences.map((exp, index) => (
                                            <div key={index} className="mb-4">
                                                <p className="font-semibold text-blue-800">{exp.position} at {exp.company}</p>
                                                <p className="text-sm text-blue-600">{exp.duration}</p>
                                                <p className="mt-1 text-gray-700">{exp.description}</p>
                                            </div>
                                        ))}
                                    </div>
                                    <Separator className="bg-blue-200" />
                                    <div>
                                        <h4 className="text-xl font-semibold text-blue-700 mb-2">Education</h4>
                                        {education.map((edu, index) => (
                                            <div key={index} className="mb-2">
                                                <p className="font-semibold text-blue-800">{edu.degree}</p>
                                                <p className="text-blue-600">{edu.school}, {edu.year}</p>
                                            </div>
                                        ))}
                                    </div>
                                    <Separator className="bg-blue-200" />
                                    <div>
                                        <h4 className="text-xl font-semibold text-blue-700 mb-2">Skills</h4>
                                        <div className="flex flex-wrap gap-2">
                                            {skills.map((skill, index) => (
                                                <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                                                    {skill}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </motion.div>
                            </CardContent>
                        </Card>
                        <div className="mt-6 text-center">
                            <Button onClick={downloadResume} className="bg-green-600 hover:bg-green-700 text-white">
                                <Download className="mr-2 h-4 w-4" /> Download Resume
                            </Button>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    )
}