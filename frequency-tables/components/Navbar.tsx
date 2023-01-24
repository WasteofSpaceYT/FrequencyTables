import Link from "next/link"

const Navbar = () => {
    return(
        <>
        <div style={{marginTop: "5px", marginLeft: "5px"}}>
            <Link href={"/"} style={{marginRight: "5px"}}><button>Frequency Table</button></Link>
            <Link href={"/deviation"}><button>Deviation</button></Link>
        </div>
        </>
    )
}

export default Navbar