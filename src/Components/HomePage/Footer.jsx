import "./Footer.css"

export default function Footer() {
    return (
        <div className="footer">
            <hr></hr>
            <p>© 2025 Erwin Medina | All Rights Reserved </p>
            <p>Connect with me!</p>
            <div className="footerIcons">
                <a href="https://www.linkedin.com/in/erwinmedina/">
                    <i class="devicon-linkedin-plain"></i> 
                </a>
                <a href="https://github.com/erwinmedina">
                    <i class="devicon-github-original"></i>
                </a>
            </div>
        </div>
    )
}