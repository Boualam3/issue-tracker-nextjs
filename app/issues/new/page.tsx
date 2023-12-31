import dynamic from "next/dynamic"
import IssueFormSkeleton from "./loading"

const IssueForm = dynamic(() => import("../_components/IssueForm"), {
  // we make ssr false cuz we need it for md editor
  ssr: false,
  loading: () => <IssueFormSkeleton />,
})

const NewIssuePage = () => {
  return <IssueForm />
}

export default NewIssuePage
