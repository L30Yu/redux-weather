import tz from 'tz-lookup';
import moment from 'moment';
import momenttz from 'moment-timezone';

export default function formatDays(days, coord){
    let result = {};
    let timezone = tz(coord.lat, coord.lon);
    let localToday = moment().tz(timezone);
    // get offset total minutes
    let minutesOffSet = moment.parseZone(localToday.format()).utcOffset();  
    let today = localToday.format('YYYY-MM-DD');    
    days.forEach(date => {
        let thisDate
        if(minutesOffSet < 0) 
            thisDate = moment(date.dt_txt).subtract(minutesOffSet, 'minutes');        
        else
            thisDate = moment(date.dt_txt).add(minutesOffSet, 'minutes');                
        if(moment(thisDate).isAfter(today)){
            let thisDateStr = thisDate.format('YYYYMMDD');
            if(!result[thisDateStr]){
                result[thisDateStr] = {};
            }
            if(!result[thisDateStr]['temp']){
                result[thisDateStr]['temp'] = [];
            }
            result[thisDateStr]['temp'].push(date.main.temp);
            
            if(!result[thisDateStr]['weather']){
                result[thisDateStr]['weather'] = [];
            }
            result[thisDateStr]['weather'].push(date.weather[0].description);
        }
    });
    return result;
}