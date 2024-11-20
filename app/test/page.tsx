import { checkTableExistsRds } from "../utils/rds"

export default function Home() {
    checkTableExistsRds("Seller");
    return(
        <>
        hello
        </>
    )
}