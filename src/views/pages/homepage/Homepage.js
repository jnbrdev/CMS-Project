import { useRef } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import "../../../all-views-scss/_hompagestyle.scss";
import { Link } from "react-router-dom";

function Homepage() {
	const navRef = useRef();

	const showNavbar = () => {
		navRef.current.classList.toggle(
			"responsive_nav"
		);
	};

	return (
		<header>
			<h3><a class="header-logo" href="#"><img src="./images/com-logo2.png"></img></a></h3>
			<nav ref={navRef}>
				<Link href="/#">Home</Link>
				<Link href="/#">About</Link>
				<Link href="/#">Contact</Link>
				<Link to="/login">Sign In</Link>
				<button
					className="nav-btn nav-close-btn"
					onClick={showNavbar}>
					<FaTimes />
				</button>
			</nav>
			<button
				className="nav-btn"
				onClick={showNavbar}>
				<FaBars />
			</button>
		</header>
	);
}

export default Homepage;