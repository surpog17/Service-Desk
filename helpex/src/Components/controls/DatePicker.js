import React, {useState} from 'react'
import { MuiPickersUtilsProvider, KeyboardDatePicker } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

export default function DatePicker(props) {

    const { name, label} = props


    // const convertToDefEventPara = (name, value) => ({
    //     target: {
    //         name, value
    //     }
    // })

    const [selectedDate, setSelectedDate] = React.useState(new Date());

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker disableToolbar variant="inline" inputVariant="outlined"
                label={label}
                closeMenuOnSelect={true}
                // format="MM/dd/yyyy"
                name={name}
                // value={value}
                // onChange={date =>onChange(convertToDefEventPara(name,date))}
                value={selectedDate}
          onChange={handleDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}

            />
        </MuiPickersUtilsProvider>
    )
}




// import Datepicker from "react-datepicker";
// import React from 'react'
			
// export default function DatePicker(props) {
//     return(
//             <Datepicker
//                     required
//                     // selected={appDate}
//                     onChange={handleChangeDate}
//                     showTimeSelect
//                     dateFormat="Pp"
//                     className="Datepicker pa2"
//                     minDate={new Date()}
//                     placeholderText="Select a date"
//                     calendarClassName="rasta-stripes"
//                     popperModifiers={{
//                         offset: {
//                           enabled: true,
//                           offset: "0px, 0px"
//                         },
//                         preventOverflow: {
//                           enabled: true,
//                           escapeWithReference: false,
//                           boundariesElement: "scrollParent"
//                         }
//                       }}
//                 />
//     )}