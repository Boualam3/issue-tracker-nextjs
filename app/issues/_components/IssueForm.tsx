"use client"
import { Button, Callout, TextField, Text } from "@radix-ui/themes"
import dynamic from "next/dynamic"

import { useForm, Controller } from "react-hook-form"
import { useRouter } from "next/navigation"
import axios from "axios"
import "easymde/dist/easymde.min.css"
import { useState } from "react"
import { AiFillInfoCircle } from "react-icons/ai"
import { zodResolver } from "@hookform/resolvers/zod"
import { issueSchema } from "@/app/validationSchemas"
import { z } from "zod"
import { ErrorMessage, Spinner } from "@/app/_components"
import { Issue } from "@prisma/client"

const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
})

type IssueFormData = z.infer<typeof issueSchema>

//?===================================================

function IssueForm({ issue }: { issue?: Issue }) {
  const router = useRouter()
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IssueFormData>({
    resolver: zodResolver(issueSchema),
  })
  const [error, setError] = useState<string>()
  const [isSubmitting, setSubmitting] = useState(false)
  const onSubmit = handleSubmit(async (data) => {
    try {
      setSubmitting(true)
      console.log(data)
      if (issue) await axios.patch("/api/issues/" + issue.id, data)
      else await axios.post("/api/issues", data)
      router.push("/issues")
      router.refresh()
    } catch (error) {
      setSubmitting(false)
      setError("An unexpected error occurred")
      console.log(error)
    }
  })
  return (
    <div className="max-w-xl">
      {error && (
        <Callout.Root color="red" className="mb-5">
          <Callout.Icon>
            <AiFillInfoCircle />
          </Callout.Icon>
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form className="max-w-xl space-y-3" onSubmit={onSubmit}>
        <TextField.Root>
          <TextField.Input
            defaultValue={issue?.title}
            placeholder="Title"
            {...register("title")}
          />
        </TextField.Root>
        <ErrorMessage>{errors.title?.message}</ErrorMessage>
        <Controller
          name="description"
          control={control}
          defaultValue={issue?.description}
          render={({ field }) => (
            <SimpleMDE placeholder="Description..." {...field} />
          )}
        />
        <ErrorMessage>{errors.description?.message}</ErrorMessage>

        <Button disabled={isSubmitting}>
          {issue ? "Update issue" : "Submit new issue"}{" "}
          {isSubmitting && <Spinner />}
        </Button>
      </form>
    </div>
  )
}

export default IssueForm
