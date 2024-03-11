import Logo from "@/components/ui/Logo";
import SearchPeople from "@/components/ui/SearchPeople";
import NavBar from "@/components/ui/Navbar";

export default function Header() {
    return (
        <div className="h-[7vh] flex justify-around items-center bg-[#fff]">
            <Logo />
            <SearchPeople />
            <NavBar />
        </div>
    );
}