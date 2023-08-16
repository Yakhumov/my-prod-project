import { Button } from "shared/ui/Button";
import { Text } from "shared/ui/Text";
import { ButtonSize } from "shared/ui/Button/Button";
import { ThemeButton } from "shared/ui/Button/Button";
import { classNames } from "shared/lib/classNames/classNames";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { ProfileActions, getReadOnly } from "entities/Profile";
import { useCallback } from "react";
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch/useAppDispatch";
import { updateProfileData } from "entities/Profile/model/services/updateProfileData/updateProfileData";
import { HStack } from "shared/ui/Stack";

interface ProfilePageHeaderProps {
  className?: string;
}

export const ProfilePageHeader: React.FC<ProfilePageHeaderProps> = (props) => {
  const { className } = props;
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const readonly = useSelector(getReadOnly);

  const onUpdate = useCallback(() => {
    dispatch(ProfileActions.setReadonly(false));
  }, []);

  const onCancel = useCallback(() => {
    dispatch(ProfileActions.oncancelEdit());
  }, []);

  const onSave = useCallback(() => {
    dispatch(updateProfileData());
  }, []);

  return (
    <HStack  max justify={'between'} className={classNames("", {}, [className])}>
      <Text title={t("Профиль")} />
      {readonly ? (
        <Button
          size={ButtonSize.M}
          theme={ThemeButton.CLEAR}
          onClick={onUpdate}
        >
          {t("Редактировать")}
        </Button>
      ) : (
        <HStack gap={'8'}>  
          <Button
            size={ButtonSize.M}
            theme={ThemeButton.OUTLINE_RED}
            onClick={onCancel}
          >
            {t("Отменить")}
          </Button>

          <Button
            size={ButtonSize.M}
            theme={ThemeButton.CLEAR}
            onClick={onSave}
          >
            {t("Сохранить ")}
          </Button>
        </HStack>
      )}
    </HStack>
  );
};
