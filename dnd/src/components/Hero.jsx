const Hero = () => {
    return(
        <div className="hero min-h-screen" style={{ backgroundImage: `url("https://images8.alphacoders.com/372/372009.jpg")` }}>
            <div className="hero-overlay bg-opacity-60"></div>
            <div className="hero-content text-center text-neutral-content">
                <div className="max-w-md">
                <h1 className="mb-5 text-5xl font-bold">Stay awhile and listen..</h1>
                <p className="mb-5">We'll bring the dice. You can bring the liquor</p>
                <button className="btn loading"><a href="/encounter">Log In to get Started</a></button>
                </div>
            </div>
        </div>
    )
}

export default Hero