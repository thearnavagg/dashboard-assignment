import supabase from "@/db/supabase";

export const addStudent = async (student) => {
    const { data, error } = await supabase.from('students').insert([student]);
    if (error) throw error;
    return data;
};

export const updateStudent = async (id, updates) => {
    const { data, error } = await supabase.from('students').update(updates).eq('id', id);
    if (error) throw error;
    return data;
};

export const deleteStudent = async (id) => {
    const { data, error } = await supabase.from('students').delete().eq('id', id);
    if (error) throw error;
    return data;
};
