import { Skeleton } from "@/app/_components"
import { Box } from "@radix-ui/themes"

function IssueFormSkeleton() {
  return (
    <Box className="max-w-xl">
      <Skeleton height="3rem" />
      <Skeleton height="20rem" />
    </Box>
  )
}

export default IssueFormSkeleton
