"use client"
import { Button, Callout, TextField } from "@radix-ui/themes"
import SimpleMDE from "react-simplemde-editor"
import { useForm, Controller } from "react-hook-form"
import { useRouter } from "next/navigation"
import axios from "axios"
import "easymde/dist/easymde.min.css"
import { useState } from "react"
import { AiFillInfoCircle } from "react-icons/ai"

interface IssueForm {
  title: string
  description: string
}

const NewIssuePage = () => {
  const router = useRouter()
  const { register, control, handleSubmit } = useForm<IssueForm>()
  const [error, setError] = useState<string>()
  const onSubmit = handleSubmit(async (data) => {
    try {
      await axios.post("/api/issues", data)
      router.push("/issues")
    } catch (error) {
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
          <TextField.Input placeholder="Title" {...register("title")} />
        </TextField.Root>
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <SimpleMDE placeholder="Description..." {...field} />
          )}
        />

        <Button>Submit new issue</Button>
      </form>
    </div>
  )
}

export default NewIssuePage
