{
	console.log(authenticateResponse);
    if (authenticateResponse.ok) {
        const data = await authenticateResponse.json();
        const bearerToken = data.access_token;
        console.log(bearerToken);
        // Save the bearer token to session storage
        sessionStorage.setItem("bearerToken", bearerToken);
        // Redirect to the customer list page
        window.location.href = "CustomerListScreen.html";
    } else {
        {
            href("access_token", "dGVzdEBzdW5iYXNlZGF0YS5jb206VGVzdEAxMjM=")
          }
    }
}


function createCustomer(event) {
    event.preventDefault();
    const createCustomerForm = document
            .getElementById("createCustomerForm");
    const firstName = createCustomerForm.first_name.value;
    const lastName = createCustomerForm.last_name.value;
    const street = createCustomerForm.street.value;
    const address = createCustomerForm.address.value;
    const city = createCustomerForm.city.value;
    const state = createCustomerForm.state.value;
    const email = createCustomerForm.email.value;
    const phone = createCustomerForm.phone.value;

    const bearerToken = sessionStorage.getItem("bearerToken");
    console.log("token  -", bearerToken);
    const createCustomerResponse = fetch(": https://qa2.sunbasedata.com/sunbase/portal/api/assignment.jsp",{
                mode: 'cors',
                method : "POST",
                headers : {
                    "Authorization" : 'Bearer dGVzdEBzdW5iYXNlZGF0YS5jb206VGVzdEAxMjM='
                },
                body : JSON.stringify({
                    first_name : firstName,
                    last_name : lastName,
                    street : street,
                    address : address,
                    city : city,
                    state : state,
                    email : email,
                    phone : phone
                })
            });

    if (createCustomerResponse.status === 201) {
        alert("Successfully Created");
        window.location.href = "CustomerListScreen.html";
    } else if (createCustomerResponse.status === 400) {
        alert("First Name or Last Name is missing");
    } else {
        alert("Failed to create customer. Please try again later.");
    }
}
async
	function deleteCustomer(event) {
		event.preventDefault();
		const deleteCustomerForm = document
				.getElementById("deleteCustomerForm");
		const customerUuid = deleteCustomerForm.customerUuid.value;

		const bearerToken = sessionStorage.getItem("bearerToken");

		const deleteCustomerResponse = await
		fetch("https://qa2.sunbasedata.com/sunbase/portal/api/assignment.jsp",
				{
					method : "POST",
					headers : {
						"Content-Type" : "application/json",
						"Authorization" : `Bearer ${bearerToken}`
					},
					body : JSON.stringify({
						cmd : "delete",
						uuid : customerUuid
					})
				});

		if (deleteCustomerResponse.status === 200) {
			alert("Customer deleted successfully!");
			window.location.href = "customer_list.jsp"; // Redirect to customer list page
		} else if (deleteCustomerResponse.status === 500) {
			alert("Error: Customer could not be deleted. Please try again later.");
		} else if (deleteCustomerResponse.status === 400) {
			alert("Error: Customer UUID not found.");
		} else {
			alert("Failed to delete customer. Please try again later.");
		}
	}

    async function updateCustomer(event) {
        event.preventDefault();
        const updateCustomerForm = document.getElementById("updateCustomerForm");
        const custome = updateCustomerForm.customerUuid.value;
        const firstName = updateCustomerForm.first_name.value;
        const lastName = updateCustomerForm.last_name.value;
        const street = updateCustomerForm.street.value;
        const address = updateCustomerForm.address.value;
        const city = updateCustomerForm.city.value;
        const state = updateCustomerForm.state.value;
        const email = updateCustomerForm.email.value;
        const phone = updateCustomerForm.phone.value;

        const bearerToken = sessionStorage.getItem("bearerToken");

        const updateCustomerResponse = await fetch("https://qa2.sunbasedata.com/sunbase/portal/api/assignment.jsp", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${bearerToken}`
            },
            body: JSON.stringify({
                cmd: "update",
                uuid: customerUuid,
                first_name: firstName,
                last_name: lastName,
                street: street,
                address: address,
                city: city,
                state: state,
                email: email,
                phone: phone
            })
        });

        if (updateCustomerResponse.status === 200) {
            // Customer updated successfully
            alert("Customer updated successfully!");
            // Redirect to customer list page or update the customer list on the current page
            window.location.href = "customer_list.html"; // Redirect to customer list page
        } else if (updateCustomerResponse.status === 500) {
            // Handle server error (UUID not found)
            alert("Error: Customer UUID not found.");
        } else if (updateCustomerResponse.status === 400) {
            // Handle client error (Body is Empty)
            alert("Error: Body is Empty. Please fill in the required fields.");
        } else {
            // Handle other errors
            alert("Failed to update customer. Please try again later.");
        }
    }