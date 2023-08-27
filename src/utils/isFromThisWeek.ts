// need to create a js package for this and publish it to npm
// TODO : Add test
export default function isFromThisWeek(date: Date) : boolean {
    const todayIndex: number = new Date().getDay();

    const thisWeeksStartDate: Date = new Date(new Date().setDate(new Date().getDate() - todayIndex + 1));
    thisWeeksStartDate.setHours(0, 0, 0, 0,);

    const thisWeeksEndDate: Date = new Date(new Date().setDate(new Date().getDate() + 7 - todayIndex));
    thisWeeksEndDate.setHours(23, 59, 59, 999);

    return date.getTime() >= thisWeeksStartDate.getTime() && date.getTime() <= thisWeeksEndDate.getTime();
}