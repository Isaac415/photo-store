import Link from "next/link"
import SignOutButton from "./SignOutButton"

export default function Nav() {
    return (
      <nav className="sticky top-0 bg-gray-100/80 backdrop-blur z-100 px-8 py-3 rounded-3xl w-9/10 ">
        <ul className="flex justify-between items-center">
          <li>
            <Link href='/photos' className="text-black-300 font-bold hover:text-gray-700">
              Photos
            </Link>
          </li>
          <li>
            <SignOutButton />
          </li>
        </ul>
      </nav>
    );
  }