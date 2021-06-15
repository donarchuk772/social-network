import { Form, Formik } from 'formik'
import { TextField } from '@material-ui/core'
import Checkbox from '@material-ui/core/Checkbox'
import s from './Search.module.sass'
import { ChangeEvent, FC } from 'react'

const Search: FC<PropsType> = ({
	setSearchQuery,
	getUsers,
	setCurrentPage,
	setCheckboxState,
	isLoading,
	checkboxState,
}) => {
	const customHandleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setCheckboxState(e.target.checked)
		setSearchQuery('')
		setCurrentPage(1)
		e.target.checked ? getUsers(1, '', e.target.checked) : getUsers()
	}
	return (
		<div className={s.searchBox}>
			<Formik
				initialValues={{
					search: '',
					onlyFriends: true,
				}}
				onSubmit={(values, actions) => {
					setCurrentPage(1)
					getUsers(1, values.search, checkboxState)
					setSearchQuery(values.search)
					actions.resetForm()
				}}
			>
				{({ values, errors, handleChange, handleBlur, handleSubmit }) => (
					<div>
						<div className={s.header}>
							<div className={s.title}>Search users</div>
							<div className={s.checkbox}>
								<Checkbox
									name="onlyFriends"
									disabled={isLoading}
									color="primary"
									onChange={customHandleChange}
									checked={checkboxState}
								/>
								<div className={s.description}>Show only friends</div>
							</div>
						</div>
						<Form onSubmit={handleSubmit} className={s.form}>
							<TextField
								fullWidth
								value={values.search}
								label="Search"
								type="search"
								name="search"
								variant="outlined"
								onChange={handleChange}
								onBlur={handleBlur}
								error={Boolean(errors.search)}
								disabled={isLoading}
							/>
						</Form>
					</div>
				)}
			</Formik>
		</div>
	)
}

type PropsType = {
	setSearchQuery: (arg0: string) => void
	getUsers: (arg0?: number, arg1?: string, arg2?: boolean) => void
	setCurrentPage: (arg0: number) => void
	setCheckboxState: (arg0: boolean) => void
	isLoading: boolean
	checkboxState: boolean
}

export default Search
