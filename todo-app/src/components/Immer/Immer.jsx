import { useRef, useCallback, useState } from 'react';
import { produce } from 'immer';

const Immer = () => {
  const nextId = useRef(1);

  const [formData, setFormData] = useState({ name: '', username: '' });
  const [userData, setUserData] = useState({ array: [], uselessValue: null });

  const onChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData(
      produce((draft) => {
        draft[name] = value;
      }),
    );
  }, []);

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();

      const nextUserInfo = {
        id: nextId.current,
        name: formData.name,
        username: formData.username,
      };

      setUserData(
        produce((draft) => {
          draft.array.push(nextUserInfo);
        }),
      );

      setFormData({
        name: '',
        username: '',
      });

      nextId.current += 1;
    },
    [formData.name, formData.username],
  );

  const onRemove = useCallback(
    (id) => {
      setUserData({
        ...userData,
        array: userData.array.filter((item) => item.id !== id),
      });
    },
    [userData],
  );

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          name="username"
          placeholder="아이디"
          value={formData.username}
          onChange={onChange}
        />
        <input
          name="name"
          placeholder="실명"
          value={formData.name}
          onChange={onChange}
        />
        <button>등록</button>
      </form>
      <ul>
        {userData.array.map(({ id, name, username }) => (
          <li key={id} onClick={() => onRemove(id)}>
            {username} ({name})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Immer;
