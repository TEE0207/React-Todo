import { useEffect, useRef, useState } from "react"

const OTP_DIGITS_COUNT = 5

const OtpValidate = () => {


    const [inputArr, setInputArr] = useState( new Array(OTP_DIGITS_COUNT).fill(""))

    const refArr = useRef([])

    useEffect(() =>{
       refArr.current[0]?.focus
    }, [])

    const handleOnChange = (value , index) => {
        if(isNaN(value)) return

        const newValue = value.trim()

        const newArr = [...inputArr]
        
        newArr[index] = value.slice(-1)

            setInputArr(newArr) 

 // This is for the auto focus to move to the next input
              newValue &&     refArr.current[index + 1]?.focus

    }

    const handleOnKeyDown = (e, index) => {
     if (!e.target.value && e.key === "Backspace") {
       refArr.current[index - 1]?.focus

      }
    }

  return (

    <div>
        <h1>Validate OTP</h1>

        {
            inputArr.map((item, index) =>  (

                    <input
                     type="text"
                     key = {index}
                     value={inputArr[index]}
                     ref={(input) => refArr.current(index) = input}
                     onChange={(e) => handleOnChange(e.target.value , index)}
                     onKeyDown={(e) => handleOnKeyDown(e .index)}
                      />

                )
                
            )
        }
        

    </div>
  )
}

export default OtpValidate