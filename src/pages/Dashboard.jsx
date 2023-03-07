    const userName = fetchData('userName');
export async function dashboardAction({ request }) {
    const data = await request.formData();
    const formData = Object.fromEntries(data)

    try {
        localStorage.setItem("userName", JSON.stringify(formData.userName))
        return toast.success(`Welcome, ${formData.userName}`)
    } catch (e) {
        throw new Error("There was a problem creating your account.")
    }
}
