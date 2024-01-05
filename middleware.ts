export { default } from "next-auth/middleware"

export const config = {
  matcher: [
    "/issues/new",
    // '+' mean one or more parameter anything come after edit  will include this route in middleware function
    "/issues/edit/:id+",
  ],
}
