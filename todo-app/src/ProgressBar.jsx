import React, { useEffect, useState } from 'react'


function ProgressBar ({progresslevel}) {

    const [animatedProgress , setAnimatedProgress] = useState(0)

    useEffect(() => {
      setTimeout(() => setAnimatedProgress(progresslevel), 100)
    }, [progresslevel])


 return (

    <div className='outer'>
        <div
        className='inner'
        style={{
            // width : `${progressleg}%`,
            transform : `translateX(${animatedProgress - 100}%)`,
            color : animatedProgress < 5 ? "black" : "white",
        }}

        // Accessibility

        role = "progressbar"
        aria-valuenow={progresslevel}
        aria-valuemax="100"
        aria-valuemin="0"
        >
            {progresslevel}%
        </div>
    </div>
  )
}


export default function Progress () {

    const bars = [4, 5, 10, 30, 50, 70, 80, 90, 100]


 return (
    
    <div>
        {

            bars.map(item => <ProgressBar key={item} progresslevel = {item}  />
)
        }
        
    </div>
  )
}



 


