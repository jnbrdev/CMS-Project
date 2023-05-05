import { useRef } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import "../../../all-views-scss/_hompagestyle.scss";
import { Link } from "react-router-dom";

function Homepage() {
	const navRef = useRef();

	const showNavbar = () => {
		navRef.current.classList.toggle(
			"home-responsive_nav"
		);
	};

	return (
		<div classsName="home-container">
			<header className="home-header-menu">
				<div className="col-md-6">
					<Link to="/" className="logo-image">
						<img src="../images/condo-connect.png" className="home-header-menu-logo" />
					</Link>
				</div>
				<div className="col-md-6">
					<nav ref={navRef}>
						<Link href="/#">HOME</Link>
						<Link href="/#">ABOUT</Link>
						<Link href="/#">CONTACT</Link>
						<Link to="/login">SIGN IN</Link>
						<button
							className="home-nav-btn nav-close-btn"
							onClick={showNavbar}>
							<FaTimes />
						</button>
					</nav>
					<button
						className="home-nav-btn"
						onClick={showNavbar}>
						<FaBars />
					</button>
				</div>
			</header>
			
			<div className="home-body">
				<h1>Your condominium <br/> that awaits!</h1>
			</div>

			<footer className="footer">
				{/* <h4>Hello Word</h4> */}
			</footer>
		</div>
	);
}

export default Homepage;