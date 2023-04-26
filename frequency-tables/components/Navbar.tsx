import Link from "next/link"

const Navbar = () => {
    return(
        <>
        <div style={{marginTop: "5px", marginLeft: "5px"}}>
            <Link href={"/"} style={{marginRight: "5px"}}><button>Frequency Table</button></Link>
            <Link href={"/deviation"}><button>Deviation</button></Link>
            <Link href={"/binomialdist"}><button>Binomial Distribution</button></Link>
            <Link href={"/motor"}><button>Motor Calculations</button></Link>
        </div>
        </>
    )
}

export default Navbar