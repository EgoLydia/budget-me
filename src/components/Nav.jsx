            {
                userName && (
                    <Form method='post' action='/logout' onSubmit={(event) => {
                        if (!confirm("Delete user and all data?")) {
                            event.preventDefault()
                        }
                    }}>
                        <button type='submit' className='btn btn--warning'>
                            <span>Delete User</span>
                            <TrashIcon width={20} />
                        </button>
                    </Form>
                )
