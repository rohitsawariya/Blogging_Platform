import BlogPost from '../models/BlogPost'; 

export const getTasks = async (req, res) => {
  try {
    const tasks = await BlogPost.find();  
    res.status(200).json({ tasks });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const addTask = async (req, res) => {
  try {
    const { name, description } = req.body;
    const newTask = new BlogPost({ title: name, content: description });
    await newTask.save();
    res.status(201).json({ message: 'Task added successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedTask = await BlogPost.findByIdAndDelete(id);

    if (!deletedTask) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
