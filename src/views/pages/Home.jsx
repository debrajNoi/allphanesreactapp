import React from 'react'

import subs from '../../assets/web_img/subscription.jpg'
import money2 from '../../assets/web_img/money-img.jpeg'
import retro from '../../assets/web_img/retro-sound.png'
import piano from '../../assets/web_img/piano.png'





function Home() {
    return (
        <main>
            <section id='banner'>
                <div className='container'>
                    <div className="row justify-content-center">
                        <div className="col-lg-7 col-md-5">
                            <div className='center-item'>
                                <div className='banner_content p-md-5'>
                                    <h1 className='m-0'>a <span>Forum</span></h1>
                                    <h2 className='m-0'><span>Where creators,</span> professionals and others can provide, market and get paid for their
                                        creations, products and services.
                                    </h2>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-5 col-md-6">
                            {/* <img src={banner} alt="banner" className='banner-img mt-5' /> */}

                            {/* <img src='https://www.pngplay.com/wp-content/uploads/12/Microphone-PNG-Photos.png' /> */}

                        </div>
                    </div></div>
            </section>

            <section className='block_content  p-5'>

                <div className='container'>
                    <div className='row'>


                        <div className='col-lg-6 pt-5 mb-5'>
                            <img src={piano} alt="gelo" width="100%" />


                        </div>
                        <div className='col-lg-6'>
                            <h1 className='' style={{ textAlign: "right" }}> Welcome to the community of creators and those who support them !!</h1>
                        </div>

                    </div>

                </div>

            </section>



            <section id="features" className='container-fluid '>



                <div className='container features_propraty pt-5'>
                    {/* 
<h3 className='text-center pt-5 mb-5'>Welcome to the community of creators and those who support them !!</h3> */}


                </div>


                <div className='container features_propraty'>
                    <div className="row">
                        <div className="col-lg-6 col-md-6">
                            <div className="center-item">
                                <div className=' content pt-5'>
                                    <h2>Subscription</h2>
                                    <h4> is free. Please join to see the world we are creating !!</h4>
                                    {/* <p>

                                Click this for following content: “Find great content in art, music, writing, photos, videos and much more”
Allphanes content is about some of the best creations of our community. Creations that will give something to the world that outlast us. Great writing, photos, art, videos, and much more. Expressions of human talent at its best. 
Click this for following content: “Connect with creators as they work to bring their work into the world”</p> */}


                                    {/* <p>
Creators do not work in isolation. They are most fulfilled when the work they create is appreciated. In this community the fans and the artists find and encourage and support each other. Some creators may allow their friends and fans to join them in creation. Perhaps some of your inputs and ideas will be part of the next great hit of these artists.
Click this for following content: “Support the celebrities you follow”</p> */}

                                    {/* <p>
The artists and people whose work you enjoy, love your appreciation. On Allphanes you can do more by subscribing to their work to get access to exclusive contents and events. 
Click this for following content: “Show your interest and talent and win awards and fans”</p> */}

                                    {/* <p>All subscribers to Allphanes can participate in contests where you can showcase your creations and be reviewed by the community. You could be a winner and get great recognition from this community.
Click this for following content: “Join a vibrant and growing community where there are many ways to be rewarded”</p> */}
                                    <h5 className='mt-5'>Allphanes provides many ways to be compensated for you hard work as creator. </h5>
                                    <ul>
                                        <li>You could add your content to the Premium space, where you will be rewarded based on number of views. </li>
                                        <li>You could start a subscription service where your fans may subscribe to get more exclusive access to you and your exclusive content.</li>
                                        <li>You could also team with other creators to provide this subscription access and more value for your fans. </li>
                                        <li>Finally, there are the contests where you will have the opportunity to win prizes !!</li>
                                    </ul>

                                </div>
                            </div>
                        </div>

                        {/* <div className="col-lg-4 col-md-6 pt-5">
                        <img src={fea1} alt="banner" className='fea-img'  />  
                        <img src="https://www.yamaha.com/en/musical_instrument_guide/common/images/piano/parts_viewer01.jpg" alt="banner" className='fea-img'  />   
                    </div> */}
                        <div className="col-lg-6 col-md-6 col-md-offset-2">
                            <div className="center-item">
                                <div className='content pt-5'>

                                    <img src={subs} alt="banner" className='fea-img piano-img float-end m-4' />

                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </section>
            <section style={{ backgroundColor: '#e3cc1e' }}>
                <div className='container features_propraty'>
                    <div className="row">
                        <div className="col-lg-4 col-md-6  pd-0">
                            {/* <img src={fea2} alt="banner" className='fea-img'  />    */}
                            <img src={retro} className='fea-img py-5' />



                        </div>

                        <div className="col-lg-8 col-md-6">
                            <div className="center-item">
                                <div className='px-4 content'>
                                    <h2 style={{ color: "#fff" }}>Sell Digitally</h2>
                                    <h4 >
                                        Product sales services for people who have digital things to sell (music, books, pictures, etc)
                                    </h4>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section>
                <div className='container features_propraty'>
                    <div className="row">

                        <div className="col-lg-8 col-md-6">
                            <div className="center-item">
                                <div className='px-4 py-5 content'>
                                    <h2>Make Money</h2>
                                    <h4>
                                        Multiple ways to make money:
                                    </h4>
                                    <ul className='make-money-list'>
                                        <li>Winning contests</li>
                                        <li>Views of your content in the premium bundled service</li>
                                        <li>Subscriptions to your content</li>
                                        <li>Selling your services in the Creator Marketplace</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 pd-0">
                            {/* <img src={fea3} alt="banner" className='fea-img'  />    */}

                            <img src={money2} className='fea-img py-5' />
                        </div>

                    </div>
                </div>
            </section>

            {/* <section id='tbd' className=''>
            <div className="tbd container text-center">
                <h1 className='text-center'>Content  To Be Decided</h1>
            </div>
        </section> */}
        </main>
    )
}

export default Home