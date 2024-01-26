import { computed, inject } from "@angular/core";
import {
    patchState,
    signalStore,
    withComputed,
    withMethods,
    withState
} from "@ngrx/signals";
import {
    addEntity,
    withEntities,
    updateEntity,
    removeEntity
} from "@ngrx/signals/entities";
import { TodoDTO } from "../../dtos/TodoDTO";
import { TodoService } from "../../services/todo.service";

type TodosState = {
    status: "idle" | "loading" | "error";
    filter: string;
};

const initialState: TodosState = {
    status: "idle",
    filter: "",
};

export const TodosStore = signalStore(
    { providedIn: "root" },
    withState(initialState),
    withEntities<TodoDTO>(),
    withComputed(({ entities, filter }) => ({
        filteredTodos: computed(() => {
            return entities().filter(todo => todo.title.toLowerCase().includes(filter().toLowerCase()))
        }),
    })),
    withMethods((state) => {
        return {
            setFilter: (filter: string) => patchState(state, { filter }),
            addTodo: (todo: TodoDTO) => {
                const id = state.entities().length + 1;
                patchState(state, addEntity({ ...todo, id }));
            },
            deleteTodo: (id: number) => {
                patchState(state, removeEntity(id));
            },
            completeTodo: (id: number) => {
                patchState(state, updateEntity({ id: id, changes: { isCompleted: true } }));
            },
            uncompleteTodo: (id: number) => {
                patchState(state, updateEntity({ id: id, changes: { isCompleted: false } }));
            },
        };
    }),
);
