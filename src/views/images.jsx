import React, { useState, useEffect } from 'react'


export default function Images (){
    const [imgs, setImgs] = useState()
    
    useEffect(() => {

        fetch('https://allphanesusernode.herokuapp.com/Allphanesuserpost/allphanpostandgellaey/')
        .then(res => res.json())
        .then(data=> setImgs({data}))

    })
    // render() {

        console.log(imgs)

        return (
            <div>
                <h1>Main</h1>
                <img src={`https://raw.githubusercontent.com/Sakibhaqie/allphanes/main/gellary/image/1647426605429.jpg`} alt="not found"/>
                {/* https://raw.githubusercontent.com/user/repository/branch/filename */}
                {/* https://raw.githubusercontent.com/Sakibhaqie/allphanes/main/gellary/image/1647426605429.jpg */}
            </div>
        )
    // }
}