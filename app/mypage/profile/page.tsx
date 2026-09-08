import { ProfileEditHeader } from "@/components/mypage/profile-edit-header";
import { MypageNavSidebar } from "@/components/mypage/mypage-nav-sidebar";
import { ProfileTipsBox } from "@/components/mypage/profile-tips-box";
import { ProfilePhotoCard } from "@/components/mypage/profile-photo-card";
import { ProfileForm } from "@/components/mypage/profile-form";
import { ProfileFormFooter } from "@/components/mypage/profile-form-footer";
import { MobileBottomNav } from "@/components/home/mobile-bottom-nav";

export default function ProfileEditPage() {
  return (
    <div className="flex min-h-full flex-1 flex-col bg-cb-bg text-cb-ink">
      <ProfileEditHeader />

      <div className="lg:grid lg:grid-cols-[224px_minmax(0,1fr)] lg:items-start">
        <div className="hidden flex-col gap-[22px] border-r border-cb-border bg-cb-header py-[18px] lg:flex">
          <MypageNavSidebar activeHref="/mypage/profile" />
          <ProfileTipsBox />
        </div>

        <div className="min-w-0 px-[18px] pb-[26px] pt-[18px] lg:px-[26px] lg:pt-6">
          <h1 className="font-heading text-xl font-bold text-[#2F2B24] lg:text-[23px]">
            プロフィール編集
          </h1>
          <p className="mt-2.5 text-xs leading-[1.8] text-cb-muted-2 lg:mt-2.5 lg:text-[12.5px] lg:leading-normal">
            あなたのプロフィールを編集できます。変更した内容は「公開プロフィール」に反映されます。
          </p>

          <div className="mt-[18px] flex flex-col gap-[18px] lg:mt-5 lg:grid lg:grid-cols-[196px_minmax(0,1fr)] lg:items-start lg:gap-5">
            <ProfilePhotoCard />
            <ProfileForm />
          </div>

          <ProfileFormFooter />
        </div>
      </div>

      <MobileBottomNav activeHref="/mypage" />
    </div>
  );
}
