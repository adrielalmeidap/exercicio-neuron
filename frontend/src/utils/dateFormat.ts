export const formatDate = (date: Date | string, locale: string) => {
	const newDate = new Date(date);

	let day: string = newDate.getDate() >= 9 ? "" + (newDate.getDate() + 1) : "0" + (newDate.getDate() + 1);
	let month: string = newDate.getMonth() >= 9 ? "" + (newDate.getMonth() + 1) : "0" + (newDate.getMonth() + 1);
	let year: number = newDate.getFullYear();

	if (locale === "en_US") return `${year}-${month}-${day}`;
	else if(locale === "pt_BR") return `${day}/${month}/${year}`;
}
