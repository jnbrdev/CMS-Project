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
		<div classsName="container">
			<div className="header-menu">
				<h3><a class="header-menu-logo" href="#"><img src="./images/com-logo2.png"></img></a></h3>
				<nav ref={navRef}>
					<Link href="/#">HOME</Link>
					<Link href="/#">ABOUT</Link>
					<Link href="/#">CONTACT</Link>
					<Link to="/login">SIGN IN</Link>
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
			</div>
			<div className="home-body">
				<h1>The condominium <br/> that awaits!</h1>
			</div>
			{/* <footer className="footer">
				<h4>Hello Word</h4>
			</footer> */}
		</div>
	);
}

export default Homepage;