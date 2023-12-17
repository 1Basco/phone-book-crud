import { Route, Routes } from "react-router-dom";
import { AppRoutes } from "../app/enums/route.enum";
import { ListContacts } from "../pages/list";
import { CreateContactPage } from "../pages/create";
import { EditContactPage } from "../pages/edit";


export function MainNavigator(): JSX.Element {
    return (
        <Routes>
            <Route path={AppRoutes.createContact} element={<CreateContactPage />} />
            <Route path={AppRoutes.phoneBook} element={<ListContacts />} />
            <Route path={AppRoutes.editContact} element={<EditContactPage />} />
        </Routes>
    );
}