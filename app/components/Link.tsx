import NextLink from "next/link"
import { Link as RadixLink } from "@radix-ui/themes"

interface Props {
  href: string
  children: string
}

const Link = ({ href, children }: Props) => {
  // we add 'passHref' & 'legacyBehavior' cuz Nextjs does not allow to use component inside Link so with that props allow us to customize the Link
  return (
    <NextLink href={href} passHref legacyBehavior>
      <RadixLink>{children}</RadixLink>
    </NextLink>
  )
}

export default Link
